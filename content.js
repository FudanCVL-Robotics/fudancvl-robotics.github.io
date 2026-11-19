// One record is one research work. Resources belong inside the work's article.
window.RESEARCH_CONTENT = [{
  id: "roboedit", name: "RoboEdit", title: "Introducing RoboEdit",
  detailCover: "assets/covers/roboedit",
  description: "A benchmark for visual goal editing in embodied manipulation, across five settings of history, views, and demonstrations.",
  date: "2026-11-19",
  category: "Research", topic: "Robotics",
  repository: "https://github.com/FudanCVL/RoboEdit",
  planet: "assets/planets/planet-roboedit.webp", planetAlt: "An emerald ocean world with golden terraced continents", coverTitle: "RoboEdit", url: "research/roboedit/",
  keywords: "robotics manipulation image editing visual goals benchmark evaluation memory multi-view in-context learning"
}, {
  id: "wbench",
  detailCover: "assets/covers/wbench",
  title: "Introducing WBench",
  description: "A comprehensive multi-turn benchmark for interactive video world models.",
  date: "2026-05-25",
  category: "Research",
  topic: "World Models",
  featured: "main",
  repository: "https://github.com/meituan-longcat/WBench",
  leaderboard: "leaderboard/",
  cover: "assets/wbench-earth.webp",
  planet: "assets/planets/planet-00-earth.webp",
  coverTitle: "WBench",
  url: "research/wbench/",
  keywords: "world models interactive video evaluation benchmark navigation research"
}, {
  id: "wbench-long", name: "WBench-Long", title: "WBench-Long: Beyond The Next Few Seconds", evaluationListing: true,
  detailCover: "assets/covers/wbench-long",
  description: "Exploring memory, consistency, and control across longer world-model interactions.",
  category: "Research", topic: "World Models", preview: "Project Preview", featured: "side",
  coverStyle: "long", planet: "assets/planets/planet-01-wbench-long.webp", planetAlt: "A cobalt ocean world with braided white cloud systems", coverTitle: "WBench-Long", url: "research/wbench-long/",
  keywords: "long horizon long context memory temporal persistence benchmark evaluation world models",
  article: {
    deck: "What does a generated world remember after you leave it behind?",
    lead: "A world can look convincing for a moment and still lose its identity over time. Longer interactions ask more of a model: remember what has changed, preserve what has not, and make the next action fit the history that came before it.",
    sections: [
      {id: "horizon", title: "The horizon changes the question", paragraphs: ["A short clip can hide a broken connection between cause and effect. A doorway may change shape when revisited. An object may return after it was moved. A local motion can remain smooth while the larger environment drifts.", "This project preview frames WBench-Long around those delayed failures. The emphasis is on continuity across an interaction, with checkpoints that connect earlier choices to later observations."]},
      {id: "memory", title: "Return, revisit, remember", paragraphs: ["A useful evaluation can ask a model to move through a scene, modify something, explore elsewhere, and return. The return journey gives memory a concrete meaning: the same place, the same object, and the consequences of the same action.", "The proposed analysis separates immediate response from longer-term persistence. Looking at both helps distinguish a visually strong moment from a world that remains coherent over time."]},
      {id: "questions", title: "Questions worth measuring", questions: ["Does an environment remain recognizable after an extended exploration?", "Are earlier changes still present when a location is revisited?", "Can a model recover coherently after a difficult or ambiguous interaction?"]}
    ],
    sequence: [{name: "Explore", text: "Build a history of places and actions."},{name: "Change", text: "Leave a meaningful trace in the world."},{name: "Return", text: "Look for persistence beyond the current view."}],
    quote: "A longer horizon makes memory visible.", related: ["wbench", "wbench-plus-plus", "agent-memory"]
  }
}, {
  id: "wbench-robo", name: "WBench-Robo", title: "WBench-Robo: Worlds That Respond To Action", evaluationListing: true,
  detailCover: "assets/covers/wbench-robo",
  description: "A research direction for evaluating embodied interaction and physical consequences.",
  category: "Research", topic: "Robotics", preview: "Project Preview", featured: "side",
  coverStyle: "robo", planet: "assets/planets/planet-02-wbench-robo.webp", planetAlt: "An iron-red canyon world with a cobalt aurora", coverTitle: "WBench-Robo", url: "research/wbench-robo/",
  keywords: "robot robotics embodied intelligence manipulation contact action world models benchmark",
  article: {
    deck: "From watching a world to making something happen in it.",
    lead: "For an embodied agent, visual realism is only a starting point. The world also needs to respond when the agent reaches, pushes, lifts, or changes its point of view. That response is where a useful model of the physical world begins.",
    sections: [
      {id: "embodiment", title: "Interaction brings new constraints", paragraphs: ["Manipulation connects geometry, motion, and causality. A hand should make contact before an object moves. A lifted object should remain supported. A change in viewpoint should reveal the same arrangement of objects.", "This preview positions WBench-Robo as a study of those connections. The focus is on how an action changes a scene, and whether the resulting state can support the next action."]},
      {id: "consequences", title: "Look beyond the final frame", paragraphs: ["Reaching a plausible-looking end state is not enough to explain how a task unfolded. Intermediate states can reveal missed contacts, inconsistent geometry, or an action that never meaningfully affected its target.", "A proposed evaluation would inspect the interaction trajectory alongside the final state. This makes room for questions about controllability and physical plausibility without treating visual similarity as a complete measure of success."]},
      {id: "questions", title: "Questions for embodied worlds", questions: ["Does contact happen where and when the action requires it?", "Do objects preserve their identity and geometry during manipulation?", "Is the resulting state consistent with the next intended action?"]}
    ],
    sequence: [{name: "Observe", text: "Understand the scene and its affordances."},{name: "Interact", text: "Connect an action to a physical change."},{name: "Check", text: "Inspect the state that the action leaves behind."}],
    quote: "A useful world model should make actions matter.", related: ["wbench", "agent-loop", "world-trace"]
  }
}, {
  id: "wbench-plus-plus", name: "WBench++", title: "WBench++: A Broader View Of World-Model Capability", evaluationListing: true,
  detailCover: "assets/covers/wbench-plus-plus",
  description: "Connecting richer interaction settings with a more diagnostic evaluation picture.",
  category: "Research", topic: "World Models", preview: "Project Preview",
  coverStyle: "plus", planet: "assets/planets/planet-03-wbench-plus-plus.webp", planetAlt: "An emerald and cyan world with layered atmosphere", coverTitle: "WBench++", url: "research/wbench-plus-plus/",
  keywords: "wbench++ benchmark evaluation world models multi turn diagnostics interaction",
  article: {
    deck: "More ways to interact. More ways to understand what works.",
    lead: "A benchmark is most useful when it reveals what to improve next. An overall score can help summarize progress, but the explanation lives in the tasks, the interaction history, and the patterns behind individual failures.",
    sections: [
      {id: "breadth", title: "Broader coverage, clearer questions", paragraphs: ["Different interactions challenge different parts of a world model. Navigation asks for coherent space. Editing asks a model to change one thing while preserving others. Subject actions introduce intent, timing, and causal structure.", "This project preview frames WBench++ as a direction for studying those capabilities together. Its proposed emphasis is diagnostic breadth: connecting an evaluation result to the kind of interaction that produced it."]},
      {id: "diagnosis", title: "From ranking to understanding", paragraphs: ["Two systems can arrive at a similar overall score through very different strengths. A richer analysis can look at where control is reliable, where a scene drifts, and where apparent success depends on an easy setting.", "The research direction is to organize these observations into interpretable capability profiles. The aim is a clearer account of behavior, without allowing a single aggregate to hide important differences."]},
      {id: "questions", title: "A more useful evaluation picture", questions: ["Which kinds of interactions expose distinct model weaknesses?", "How do capabilities change when several requests are composed?", "Can an evaluation explain a failure as clearly as it ranks a model?"]}
    ],
    sequence: [{name: "Broaden", text: "Explore a wider range of interactions."},{name: "Connect", text: "Relate outcomes to capability dimensions."},{name: "Diagnose", text: "Make the reasons behind a score easier to see."}],
    quote: "Progress becomes more useful when it is explainable.", related: ["wbench", "wbench-long", "agent-arena"]
  }
}, {
  id: "agent-loop", name: "AgentLoop", title: "AgentLoop: Planning Is Only The Beginning",
  detailCover: "assets/covers/agent-loop",
  description: "An illustrative project on agents that act, observe, and revise their plans.",
  category: "Research", topic: "Agents", preview: "Concept Preview",
  coverStyle: "loop", planet: "assets/planets/planet-04-agent-loop.webp", planetAlt: "An amber world wrapped in circular cloud bands", coverTitle: "AgentLoop", url: "research/agent-loop/",
  keywords: "agent planning feedback tools execution reflection recovery loop",
  article: {
    deck: "Good plans need a way to learn from what actually happens.",
    lead: "An agent does not act in a static description of the world. Tools return unexpected results, assumptions become outdated, and a task can change while it is being carried out. Reliable behavior depends on closing the gap between a plan and the evidence produced by each action.",
    sections: [
      {id: "loop", title: "Keep the plan connected to reality", paragraphs: ["AgentLoop is an illustrative research concept centered on a repeated cycle: form a plan, take a bounded action, inspect the result, and revise. The next step is grounded in the latest observation rather than in an earlier expectation.", "This framing makes a distinction between a tool call completing and a task actually succeeding. A useful feedback loop needs evidence for the outcome that the agent was trying to achieve."]},
      {id: "recovery", title: "Make recovery part of the task", paragraphs: ["Unexpected results are not always terminal failures. They can be signals that an assumption was wrong, that a different tool is needed, or that the agent should narrow its next step.", "The concept explores how agents could recognize these signals and recover while respecting the original objective. An informative evaluation would examine both the final outcome and the path taken to reach it."]},
      {id: "questions", title: "What makes a loop useful?", questions: ["Does the agent inspect the consequences of its actions?", "Can it revise a plan when new evidence contradicts an assumption?", "Does it recognize when a task is complete, or when more information is needed?"]}
    ],
    sequence: [{name: "Plan", text: "Choose a concrete next action."},{name: "Act", text: "Work through a tool or environment."},{name: "Reflect", text: "Use the result to decide what comes next."}],
    quote: "A plan becomes useful when it stays open to evidence.", related: ["agent-arena", "agent-memory", "wbench-robo"]
  }
}, {
  id: "agent-arena", name: "AgentArena", title: "AgentArena: Evaluating The Work Between Request And Result", evaluationListing: true,
  detailCover: "assets/covers/agent-arena",
  description: "A concept for studying agent behavior across realistic, multi-step tasks.",
  category: "Research", topic: "Agents", preview: "Concept Preview",
  coverStyle: "arena", planet: "assets/planets/planet-05-agent-arena.webp", planetAlt: "A violet storm world with electric blue atmosphere", coverTitle: "AgentArena", url: "research/agent-arena/",
  keywords: "agent benchmark evaluation real world tasks tools planning reliability",
  article: {
    deck: "An answer is one artifact. The work behind it is another.",
    lead: "A useful agent needs to translate a request into actions, work with imperfect information, and leave behind a result that can be checked. Evaluating that process calls for more than judging a final sentence.",
    sections: [
      {id: "tasks", title: "Start with a task, not a prompt trick", paragraphs: ["AgentArena is a concept preview for an evaluation setting built around multi-step work. A task might involve finding information, organizing a workspace, making a bounded change, or checking that a requested outcome is present.", "The central idea is to define observable completion conditions. That makes the evaluation less dependent on how confidently an agent describes its own work."]},
      {id: "process", title: "Examine the path as well as the destination", paragraphs: ["The same final artifact can be produced through careful verification or a series of unsupported assumptions. Process evidence can help separate these behaviors by showing which actions were taken and what information was available at each step.", "This concept considers reliability, recovery, and instruction adherence alongside outcome quality. It is a proposed research framing, rather than a released benchmark or a set of measured results."]},
      {id: "questions", title: "What should a task reveal?", questions: ["Can completion be verified from the resulting environment or artifact?", "Does the agent preserve constraints throughout a longer task?", "What changes when tools fail or necessary information is missing?"]}
    ],
    sequence: [{name: "Request", text: "Define a goal and its constraints."},{name: "Work", text: "Observe the sequence of decisions and actions."},{name: "Verify", text: "Check the outcome against concrete evidence."}],
    quote: "Evaluate the work, not just the claim that it is done.", related: ["agent-loop", "wbench-plus-plus", "world-trace"]
  }
}, {
  id: "agent-memory", name: "AgentMemory", title: "AgentMemory: Remembering What Matters",
  detailCover: "assets/covers/agent-memory",
  description: "Exploring how agents could retain useful context without carrying every past detail.",
  category: "Research", topic: "Agents", preview: "Concept Preview",
  coverStyle: "memory", planet: "assets/planets/planet-06-agent-memory.webp", planetAlt: "An ivory and teal frozen world with layered ice", coverTitle: "AgentMemory", url: "research/agent-memory/",
  keywords: "agent memory context retrieval long term provenance knowledge personalization",
  article: {
    deck: "Useful memory is selective, grounded, and ready to be revised.",
    lead: "A longer context is not automatically a better memory. Agents need to distinguish a stable preference from a temporary fact, a verified observation from an assumption, and a useful lesson from an irrelevant detail.",
    sections: [
      {id: "selection", title: "Remember with a purpose", paragraphs: ["AgentMemory is an illustrative project concept about selecting and retrieving context for ongoing work. The question is not simply what an agent can store, but what it should bring back into a new situation.", "A memory can be useful when it captures why a decision was made, which source supported a fact, or what constraint mattered in an earlier task. Keeping those connections can make later use easier to assess."]},
      {id: "revision", title: "Leave room for change", paragraphs: ["Stored context can become stale. A configuration changes, a project moves, or a previous observation no longer applies. Memory therefore needs a way to preserve uncertainty and respond to new evidence.", "This concept explores retrieval alongside revision. Rather than treating a remembered statement as permanently true, an agent could use it as a starting point for deciding what needs to be checked now."]},
      {id: "questions", title: "Questions for persistent agents", questions: ["Is retrieved context relevant to the current objective?", "Can an agent distinguish a durable preference from a changing fact?", "Does new evidence update an earlier conclusion rather than silently contradict it?"]}
    ],
    sequence: [{name: "Select", text: "Keep context with a clear future purpose."},{name: "Retrieve", text: "Bring back what the current task needs."},{name: "Revise", text: "Update memory when the evidence changes."}],
    quote: "Remembering well also means knowing what to revisit.", related: ["agent-loop", "wbench-long", "world-trace"]
  }
}, {
  id: "scene-edit", name: "SceneEdit", title: "SceneEdit: Change The Detail, Preserve The World",
  detailCover: "assets/covers/scene-edit",
  description: "An illustrative direction for precise visual editing with stable surrounding context.",
  category: "Research", topic: "Vision", preview: "Concept Preview",
  coverStyle: "edit", planet: "assets/planets/planet-07-scene-edit.webp", planetAlt: "An indigo mineral world with magenta terrain", coverTitle: "SceneEdit", url: "research/scene-edit/",
  keywords: "vision image editing video scene controlled generation visual instruction preservation",
  article: {
    deck: "A small request should not require an entirely different scene.",
    lead: "Visual editing is a balancing act. A model needs to make the requested change while respecting everything the request leaves untouched: identity, composition, lighting, and the relationships that give a scene its structure.",
    sections: [
      {id: "intent", title: "Make the intended change explicit", paragraphs: ["SceneEdit is a concept preview for studying controlled visual transformations. A request might change an object's appearance, alter an action, or introduce a new element without rewriting the scene around it.", "This framing treats the target change and the preserved context as separate questions. An edit can look attractive while missing the user's intent, or satisfy the requested change while disturbing unrelated content."]},
      {id: "preservation", title: "Preservation is part of success", paragraphs: ["A useful evaluation would consider both what changed and what stayed consistent. The relationship between objects, the identity of a subject, and the overall composition can be as important as the edited region itself.", "The concept also opens a question about repeated edits: whether a scene can remain coherent as several instructions accumulate. This connects precise editing to the broader problem of persistent visual worlds."]},
      {id: "questions", title: "Looking at the whole edit", questions: ["Is the requested transformation visible and unambiguous?", "Which unrelated properties of the scene changed along with it?", "Do successive edits preserve a coherent visual history?"]}
    ],
    sequence: [{name: "Specify", text: "Identify the intended visual change."},{name: "Transform", text: "Apply the change in its scene context."},{name: "Preserve", text: "Inspect the details that should stay the same."}],
    quote: "The quality of an edit includes what it leaves alone.", related: ["wbench-plus-plus", "wbench-long", "video-reason"]
  }
}, {
  id: "video-reason", name: "VideoReason", title: "VideoReason: Understanding Events Across Time",
  detailCover: "assets/covers/video-reason",
  description: "An illustrative direction for reasoning about actions, entities, and causal change in video.",
  category: "Research", topic: "Vision", preview: "Concept Preview",
  coverStyle: "video", planet: "assets/planets/planet-08-video-reason.webp", planetAlt: "A turquoise cloud world with luminous weather bands", coverTitle: "VideoReason", url: "research/video-reason/",
  keywords: "vision video understanding temporal reasoning events actions entities causality multimodal",
  article: {
    deck: "A video is not a stack of images. It is a record of what changed.",
    lead: "Video understanding asks a model to connect evidence across time. Objects appear and disappear, actions unfold in stages, and the meaning of a moment often depends on what happened before it and what follows.",
    sections: [
      {id: "events", title: "Follow the event, not only the frame", paragraphs: ["VideoReason is an illustrative research concept for studying entities, actions, and relationships across a sequence. The goal is to keep track of who did what, when it happened, and which parts of the scene changed as a result.", "This framing treats temporal continuity as evidence. A model may recognize every visible object and still miss the event that connects them."]},
      {id: "reasoning", title: "Connect perception with explanation", paragraphs: ["Useful video understanding goes beyond naming actions. It can ask why an outcome occurred, whether one event preceded another, and how a subject's goal is reflected in the sequence.", "The concept brings recognition, tracking, and temporal reasoning into one view. It is a preview of a possible research direction, rather than a released model or a set of measured results."]},
      {id: "questions", title: "Questions across time", questions: ["Can a model maintain entity identity through occlusion and viewpoint change?", "Does it distinguish correlation from a plausible causal sequence?", "Can it explain an event using evidence from the relevant moments?"]}
    ],
    sequence: [{name: "Observe", text: "Identify entities, actions, and scene changes."},{name: "Connect", text: "Relate evidence across the temporal sequence."},{name: "Explain", text: "Ground an interpretation in the moments that support it."}],
    quote: "Understanding video means following change through time.", related: ["scene-edit", "wbench-long", "world-trace"]
  }
}, {
  id: "world-trace", name: "WorldTrace", title: "WorldTrace: Make An Interaction Easier To Understand",
  detailCover: "assets/covers/world-trace",
  description: "A tooling concept for connecting actions, observations, and evaluation evidence.",
  category: "Tools", topic: "Tools", preview: "Concept Preview",
  coverStyle: "trace", planet: "assets/planets/planet-09-world-trace.webp", planetAlt: "A graphite world traced by fine golden geological paths", coverTitle: "WorldTrace", url: "research/world-trace/",
  keywords: "tools traces diagnostics visualization evaluation agent world models evidence",
  article: {
    deck: "A score tells you where to look. A trace helps you see why.",
    lead: "When a model fails during a longer interaction, the interesting moment may happen well before the final output. Understanding that failure means connecting the request, the action, the generated observation, and the evidence used to evaluate it.",
    sections: [
      {id: "trace", title: "Put the interaction back in order", paragraphs: ["WorldTrace is an illustrative tooling concept for organizing a research run as a sequence of inspectable steps. Each step connects what was requested to what changed and what was observed afterward.", "The aim is to make a result easier to discuss. A shared trace can point a researcher to a particular turn or transition instead of requiring them to reconstruct the entire interaction from separate files."]},
      {id: "evidence", title: "Keep explanations close to evidence", paragraphs: ["An evaluation is easier to assess when its observations remain connected to the outputs they describe. Side-by-side views of actions and outcomes could help researchers compare behaviors, inspect difficult cases, and identify recurring failure patterns.", "This is a design concept for research tooling. The preview describes a possible workflow; it does not claim that a software package or an interactive trace service has been released."]},
      {id: "questions", title: "Questions for better research tools", questions: ["Can a reader locate the exact step behind an evaluation finding?", "Are actions, observations, and annotations connected clearly?", "Does the view help explain a difference between two model behaviors?"]}
    ],
    sequence: [{name: "Capture", text: "Keep the request and its observed result together."},{name: "Inspect", text: "Find the step where behavior changes."},{name: "Explain", text: "Connect a finding to its supporting evidence."}],
    quote: "Make the path from observation to explanation visible.", related: ["wbench-robo", "agent-arena", "video-reason"]
  }
}];

// Sizes describe the painted planet, including the crop inside its frame.
const projectCoverSizes = {
  hero: "(max-width: 760px) calc(84vw - 33px), (max-width: 1100px) min(724px, calc(71vw - 45px)), 724px",
  card: "(max-width: 520px) calc(76vw - 30px), (max-width: 960px) 38vw, min(26vw, 290px)",
  related: "(max-width: 520px) 84vw, (max-width: 760px) 42vw, min(30vw, 335px)",
  feature: "(max-width: 760px) 84vw, min(45vw, 510px)"
};

window.projectCoverImage = function (project, prefix, layout) {
  if (!project.detailCover) return null;
  const base = prefix + project.detailCover;
  return {
    src: `${base}-960.webp`,
    srcset: `${base}-640.webp 640w, ${base}-960.webp 960w, ${base}.webp 1448w`,
    sizes: projectCoverSizes[layout],
    width: 1448,
    height: 1086,
    alt: project.planetAlt || "Earth seen from space, with a golden sunrise along its edge"
  };
};
