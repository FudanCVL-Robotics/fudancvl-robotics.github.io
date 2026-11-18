(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const make = (tag, className = '', text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const state = { split: 'navi', judge: 'doubao', type: 'all', query: '', availability: 'all', sort: '0', direction: -1, selected: new Set() };
  const sources = { 'self-evaluation': 'Self-reported', 'self-evaluation-plus-organizer-vlm': 'Mixed evaluation', 'organizer-evaluation': 'Organizer evaluation', 'not-specified': 'Source not specified' };
  const judges = { doubao: 'Doubao-Seed-2.0-lite', qwen: 'Qwen3.8-27B · Beta' };
  const colors = ['#658a71', '#8d8ac3', '#d0a678'];
  let data;
  let visible = [];
  const cohort = () => data.datasets[`${state.split}-${state.judge}`];
  const score = value => value === null ? '—' : value.toFixed(1);
  const label = model => [model.name, ...model.tags].join(' · ');
  const context = () => `${state.split === 'navi' ? 'Navigation · 158 cases' : 'Full benchmark · 289 cases'} / ${judges[state.judge]}`;
  const sourceLabel = model => sources[model.evaluationSource] || sources['not-specified'];
  const prettyDate = value => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Shanghai' }).format(new Date(value));

  function render() {
    if (!data) return;
    const models = cohort();
    const terms = state.query.trim().normalize('NFKC').toLowerCase().split(/\s+/).filter(Boolean);
    visible = models.filter(model => {
      const text = `${label(model)} ${model.creator}`.normalize('NFKC').toLowerCase();
      return (state.type === 'all' || model.type === state.type) && (state.availability === 'all' || model.availability === state.availability) && terms.every(term => text.includes(term));
    });
    visible.sort((a, b) => {
      if (state.sort === 'name') return state.direction * a.name.localeCompare(b.name) || a.rank - b.rank;
      // Overall ranking uses the source's ordering, preserving ties rounded for display.
      if (state.sort === '0') return state.direction * (b.rank - a.rank);
      const left = a.scores[Number(state.sort)], right = b.scores[Number(state.sort)];
      if (left === null) return right === null ? a.rank - b.rank : 1;
      if (right === null) return -1;
      return state.direction * (left - right) || a.rank - b.rank;
    });
    const best = data.dimensions.map((_, i) => Math.max(...models.map(m => m.scores[i] ?? -Infinity)));
    const fragment = document.createDocumentFragment();
    visible.forEach(model => {
      const row = make('tr', state.selected.has(model.id) ? 'is-selected' : '');
      row.dataset.modelId = model.id;
      const checkCell = make('td', 'select-col');
      const check = make('input', 'row-check');
      check.type = 'checkbox'; check.checked = state.selected.has(model.id);
      check.setAttribute('aria-label', `Compare ${label(model)}`);
      check.addEventListener('change', () => selectModel(model, check.checked));
      checkCell.append(check);
      const rank = make('td', 'rank-col', String(model.rank).padStart(2, '0'));
      rank.title = 'Overall rank within this split and judge';
      const modelCell = make('td', 'model-col');
      const name = make('button', 'model-name', model.name);
      name.setAttribute('aria-label', `View ${label(model)} details`);
      if (model.tags.length) name.append(make('span', 'model-variant', model.tags.join(' · ')));
      name.addEventListener('click', () => showModel(model));
      const meta = make('div', 'model-meta');
      meta.append(make('span', `model-type type-${model.type}`, model.type), make('span', '', model.creator));
      if (model.evaluationSource === 'self-evaluation' || model.evaluationSource === 'self-evaluation-plus-organizer-vlm') {
        const provenance = make('span', '', sourceLabel(model));
        provenance.prepend(make('i', 'source-badge'));
        meta.append(provenance);
      }
      modelCell.append(name, meta);
      row.append(checkCell, rank, modelCell);
      model.scores.forEach((value, i) => {
        const cell = make('td');
        const number = make('span', i === 0 ? 'score-pill' : `dimension-score${value === best[i] ? ' best' : ''}`, score(value));
        if (i === 0) number.style.setProperty('--score', `${value ?? 0}%`);
        else if (value === best[i]) number.title = `Highest ${data.dimensions[i].toLowerCase()} score in this cohort`;
        cell.append(number); row.append(cell);
      });
      fragment.append(row);
    });
    $('#ranking-rows').replaceChildren(fragment);
    $('#board-empty').hidden = visible.length > 0;
    $('#download-csv').disabled = visible.length === 0;
    $('#result-status').textContent = `${visible.length} of ${models.length} entries · ${state.sort === '0' ? 'Ranked by overall score' : `Sorted by ${state.sort === 'name' ? 'model name' : data.dimensions[Number(state.sort)].toLowerCase()}`} · ${state.direction === -1 ? 'Descending' : 'Ascending'}`;
    $('#cohort-note').textContent = state.judge === 'qwen'
      ? `${models.length} entries · 19 metrics · Qwen3.8-27B beta. Only re-evaluated navigation submissions are included.`
      : `${models.length} entries · ${state.split === 'navi' ? 19 : 22} metrics · Original evaluation with Doubao-Seed-2.0-lite.${state.split === 'full' ? ' Qwen beta is available on Navigation only.' : ''}`;
    $$('[data-type]').forEach(button => {
      button.setAttribute('aria-pressed', String(state.type === button.dataset.type));
      button.querySelector('span').textContent = button.dataset.type === 'all' ? models.length : models.filter(m => m.type === button.dataset.type).length;
    });
    $$('[data-split]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.split === state.split)));
    $$('[data-sort]').forEach(button => {
      const active = button.dataset.sort === state.sort;
      if (active) button.parentElement.setAttribute('aria-sort', state.direction === -1 ? 'descending' : 'ascending');
      else button.parentElement.removeAttribute('aria-sort');
      button.querySelector('span').textContent = active ? (state.direction === -1 ? '↓' : '↑') : '↕';
    });
    renderTray();
  }

  function selectModel(model, selected) {
    if (selected && state.selected.size >= 3) {
      $('#selection-status').textContent = 'You can compare up to three models. Remove one before adding another.';
    } else {
      if (selected) state.selected.add(model.id); else state.selected.delete(model.id);
      $('#selection-status').textContent = `${state.selected.size} models selected. Select two or three to compare.`;
    }
    // Keep keyboard focus on the checkbox; don't rebuild the table for selection.
    $$('#ranking-rows tr').forEach(row => {
      const checked = state.selected.has(row.dataset.modelId);
      row.classList.toggle('is-selected', checked);
      row.querySelector('input').checked = checked;
      row.querySelector('input').disabled = !checked && state.selected.size >= 3;
    });
    renderTray();
  }

  function renderTray() {
    $('#compare-tray').hidden = state.selected.size === 0;
    $('#open-comparison').disabled = state.selected.size < 2;
    $('#open-comparison').firstChild.textContent = `Compare ${state.selected.size || ''} models `;
    $('#selected-models').replaceChildren(...cohort().filter(m => state.selected.has(m.id)).map(model => {
      const chip = make('div', 'selected-model');
      chip.append(make('span', '', label(model)));
      const remove = make('button', '', '×');
      remove.setAttribute('aria-label', `Remove ${label(model)} from comparison`);
      remove.addEventListener('click', () => { selectModel(model, false); $('#open-comparison').focus(); });
      chip.append(remove);
      return chip;
    }));
    $$('#ranking-rows input').forEach(input => { input.disabled = !input.checked && state.selected.size >= 3; });
  }

  function openDialog(title, eyebrow) {
    $('#dialog-title').textContent = title;
    $('#dialog-eyebrow').textContent = eyebrow;
    $('#dialog-context').textContent = context();
    $('#dialog-body').replaceChildren();
    $('#model-dialog').showModal();
    $('#model-dialog').scrollTop = 0;
  }

  function showModel(model) {
    openDialog(label(model), `MODEL DETAILS / RANK ${model.rank}`);
    const summary = make('div', 'detail-summary');
    [model.creator, `${model.type[0].toUpperCase()}${model.type.slice(1)} control`, model.availability, sourceLabel(model), ...(model.audio === 'yes' ? ['Audio supported · not scored'] : [])].forEach(text => summary.append(make('span', '', text)));
    if (model.updated) summary.append(make('span', '', `Source updated ${model.updated}`));
    const dimensions = make('div', 'detail-dimensions');
    model.scores.forEach((value, i) => {
      const dimension = make('div');
      dimension.append(make('strong', '', score(value)), make('span', '', data.dimensions[i]));
      dimensions.append(dimension);
    });
    const heading = make('div', 'metric-heading');
    heading.append(make('h3', '', 'Every metric, in detail'), make('span', '', 'Coverage / Score'));
    const metrics = make('ul', 'metric-list');
    data.metrics[state.split].forEach((metric, i) => {
      const item = make('li');
      item.append(make('span', '', metric.name), make('span', '', model.coverage[i] === null ? 'n = —' : `n = ${model.coverage[i]}`), make('strong', '', score(model.metrics[i])));
      metrics.append(item);
    });
    $('#dialog-body').append(summary, dimensions, heading, metrics);
  }

  function showComparison() {
    const models = cohort().filter(m => state.selected.has(m.id));
    if (models.length < 2) return;
    openDialog('Different strengths. Shared measures.', 'MODEL COMPARISON');
    const legend = make('div', 'comparison-legend');
    models.forEach((model, i) => {
      const item = make('span', 'legend-model', label(model));
      item.style.setProperty('--color', colors[i]); legend.append(item);
    });
    $('#dialog-body').append(legend);
    data.dimensions.forEach((dimension, i) => {
      const group = make('section', 'comparison-group');
      group.append(make('h3', '', dimension));
      models.forEach((model, j) => {
        const row = make('div', 'comparison-bar-row');
        row.setAttribute('aria-label', `${label(model)}, ${dimension}: ${score(model.scores[i])} out of 100`);
        const track = make('div', 'comparison-track');
        const fill = make('div', 'comparison-fill');
        fill.style.setProperty('--color', colors[j]); fill.style.setProperty('--score', `${model.scores[i] ?? 0}%`);
        track.append(fill); row.append(track, make('strong', '', score(model.scores[i]))); group.append(row);
      });
      $('#dialog-body').append(group);
    });
    $('#dialog-body').append(make('p', 'comparison-note', `All bars use the same 0–100 scale. ${models.map(m => `${label(m)}: ${sourceLabel(m).toLowerCase()}`).join('; ')}.`));
  }

  function resetCohort() {
    state.selected.clear();
    state.sort = '0'; state.direction = -1;
    $('#selection-status').textContent = 'Evaluation changed. Comparison selection cleared.';
    $('.table-scroll').scrollTop = 0;
    render();
  }

  $$('[data-split]').forEach(button => button.addEventListener('click', () => {
    if (state.split === button.dataset.split) return;
    state.split = button.dataset.split;
    if (state.split === 'full') state.judge = 'doubao';
    $('#judge').value = state.judge;
    $('#judge option[value="qwen"]').disabled = state.split === 'full';
    resetCohort();
  }));
  $('#judge').addEventListener('change', event => { state.judge = event.target.value; resetCohort(); });
  $$('[data-type]').forEach(button => button.addEventListener('click', () => { state.type = button.dataset.type; render(); }));
  $('#model-search').addEventListener('input', event => { state.query = event.target.value; render(); });
  $('#availability').addEventListener('change', event => { state.availability = event.target.value; render(); });
  $('#clear-filters').addEventListener('click', () => {
    state.type = 'all'; state.query = ''; state.availability = 'all';
    $('#model-search').value = ''; $('#availability').value = 'all'; render(); $('#model-search').focus();
  });
  $$('[data-sort]').forEach(button => button.addEventListener('click', () => {
    state.direction = state.sort === button.dataset.sort ? -state.direction : (button.dataset.sort === 'name' ? 1 : -1);
    state.sort = button.dataset.sort; render();
  }));
  $('#clear-selection').addEventListener('click', () => { state.selected.clear(); render(); $('#selection-status').textContent = 'Comparison cleared.'; });
  $('#open-comparison').addEventListener('click', showComparison);
  $('#close-dialog').addEventListener('click', () => $('#model-dialog').close());
  $('#model-dialog').addEventListener('click', event => {
    if (event.target !== $('#model-dialog')) return;
    const rect = event.target.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
  });
  $('#download-csv').addEventListener('click', () => {
    const headers = ['Split', 'Judge', 'Rank', 'Model', 'Variant', 'Team', 'Control', 'Availability', 'Evaluation source', ...data.dimensions, ...data.metrics[state.split].map(m => m.name), ...data.metrics[state.split].map(m => `${m.name} coverage`), 'Snapshot', 'Source'];
    const rows = visible.map(m => [state.split, judges[state.judge], m.rank, m.name, m.tags.join(' / '), m.creator, m.type, m.availability, sourceLabel(m), ...m.scores, ...m.metrics, ...m.coverage, data.fetchedAt, data.source]);
    const escape = value => {
      let text = value === null ? '' : String(value);
      if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
      return `"${text.replaceAll('"', '""')}"`;
    };
    const csv = '\uFEFF' + [headers, ...rows].map(row => row.map(escape).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = make('a');
    anchor.href = url; anchor.download = `wbench-${state.split}-${state.judge}.csv`;
    document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  fetch('data.json').then(response => {
    if (!response.ok) throw new Error('Leaderboard data unavailable');
    return response.json();
  }).then(result => {
    if (!['navi-doubao', 'navi-qwen', 'full-doubao'].every(key => Array.isArray(result.datasets?.[key]) && result.datasets[key].length)) throw new Error('Incomplete leaderboard snapshot');
    data = result;
    $('#snapshot-date').textContent = prettyDate(data.fetchedAt);
    $('#snapshot-date').dateTime = data.fetchedAt;
    render();
  }).catch(() => {
    $('#board-error').hidden = false;
    $('#result-status').textContent = 'Results unavailable';
    $('#cohort-note').textContent = 'The local leaderboard snapshot could not be loaded.';
    $$('.filter-toolbar input, .filter-toolbar button, .filter-toolbar select, .dataset-toolbar button, .dataset-toolbar select').forEach(control => { control.disabled = true; });
  });
})();
