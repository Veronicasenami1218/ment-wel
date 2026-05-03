export type ResourceCategory = 'All' | 'Stress' | 'Anxiety' | 'Depression' | 'Self-Care' | 'Mindfulness' | 'Relationships'
export type ResourceType = 'Article' | 'Video' | 'Guide' | 'Exercise'

export interface Resource {
  id: string
  title: string
  category: Exclude<ResourceCategory, 'All'>
  type: ResourceType
  description: string
  content: string
  readTime: number // minutes
  views: number
  tags: string[]
  featured?: boolean
}

export const RESOURCES: Resource[] = [
  {
    id: '1',
    title: '5 Evidence-Based Techniques to Manage Anxiety',
    category: 'Anxiety',
    type: 'Article',
    description: 'Learn practical, science-backed strategies to reduce anxiety in your daily life.',
    readTime: 6,
    views: 3420,
    tags: ['anxiety', 'coping', 'CBT'],
    featured: true,
    content: `Anxiety is one of the most common mental health challenges, affecting millions of people worldwide. The good news is that there are several evidence-based techniques that can help you manage anxiety effectively.

**1. Diaphragmatic Breathing (Box Breathing)**
Deep breathing activates your parasympathetic nervous system, counteracting the stress response. Try box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4–6 times whenever you feel anxious.

**2. Progressive Muscle Relaxation (PMR)**
PMR involves tensing and then releasing different muscle groups throughout your body. Start from your toes and work upward. This technique helps you become aware of physical tension and consciously release it.

**3. Cognitive Restructuring**
Anxiety often involves distorted thinking patterns. Challenge anxious thoughts by asking: "Is this thought based on facts or assumptions? What is the worst that could realistically happen? What would I tell a friend in this situation?"

**4. Grounding Techniques (5-4-3-2-1)**
When anxiety feels overwhelming, use the 5-4-3-2-1 technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present moment.

**5. Regular Physical Exercise**
Exercise is one of the most powerful natural anxiety reducers. Even a 20-minute walk can significantly reduce anxiety symptoms by releasing endorphins and reducing stress hormones like cortisol.

Remember, if anxiety is significantly impacting your daily life, consider speaking with a mental health professional who can provide personalised support.`,
  },
  {
    id: '2',
    title: 'Understanding Depression: Signs, Symptoms & When to Seek Help',
    category: 'Depression',
    type: 'Article',
    description: 'A comprehensive guide to recognising depression and knowing when professional support is needed.',
    readTime: 8,
    views: 2890,
    tags: ['depression', 'awareness', 'help-seeking'],
    featured: true,
    content: `Depression is more than just feeling sad. It is a serious mental health condition that affects how you think, feel, and function in daily life. Understanding the signs can help you or someone you care about get the right support.

**Common Signs of Depression**
- Persistent sadness, emptiness, or hopelessness
- Loss of interest in activities you once enjoyed
- Changes in appetite or weight
- Sleep disturbances (sleeping too much or too little)
- Fatigue and loss of energy
- Difficulty concentrating or making decisions
- Feelings of worthlessness or excessive guilt
- In severe cases, thoughts of death or suicide

**Depression is Not a Choice**
Depression is a medical condition with biological, psychological, and social factors. It is not a sign of weakness, and you cannot simply "snap out of it." Just as you would seek treatment for a physical illness, depression deserves proper care.

**When to Seek Help**
Seek professional help if:
- Symptoms persist for more than two weeks
- Symptoms interfere with work, relationships, or daily activities
- You have thoughts of harming yourself

**Treatment Options**
Depression is highly treatable. Options include psychotherapy (especially CBT), medication, lifestyle changes, and support groups. Most people see significant improvement with the right treatment.

If you are in crisis, please call the Nigeria Suicide Prevention Helpline: 0800-800-2000.`,
  },
  {
    id: '3',
    title: 'The Science of Stress: How It Affects Your Body and Mind',
    category: 'Stress',
    type: 'Article',
    description: 'Understand what happens in your body when you are stressed and how to break the cycle.',
    readTime: 7,
    views: 2150,
    tags: ['stress', 'cortisol', 'biology'],
    content: `Stress is a natural response to perceived threats or challenges. Understanding the science behind stress can help you manage it more effectively.

**The Stress Response**
When you encounter a stressor, your brain's amygdala triggers the "fight-or-flight" response. Your adrenal glands release cortisol and adrenaline, causing your heart rate to increase, muscles to tense, and breathing to quicken. This response was designed for short-term survival threats.

**Chronic Stress and Its Effects**
The problem arises when stress becomes chronic. Prolonged elevated cortisol levels can:
- Suppress the immune system
- Increase blood pressure
- Disrupt sleep patterns
- Impair memory and concentration
- Contribute to anxiety and depression
- Cause digestive problems

**Breaking the Stress Cycle**
Effective stress management involves both addressing the source of stress and managing your body's response:

1. **Identify your stressors** — Keep a stress journal to identify patterns
2. **Time management** — Prioritise tasks and learn to delegate
3. **Physical activity** — Exercise metabolises stress hormones
4. **Social support** — Talking to others reduces the stress response
5. **Relaxation techniques** — Meditation, yoga, and deep breathing activate the relaxation response
6. **Adequate sleep** — Sleep is when your body recovers from stress

Remember that some stress is normal and even beneficial. The goal is not to eliminate stress but to manage it effectively.`,
  },
  {
    id: '4',
    title: 'A Beginner\'s Guide to Mindfulness Meditation',
    category: 'Mindfulness',
    type: 'Guide',
    description: 'Start your mindfulness practice with this step-by-step guide for complete beginners.',
    readTime: 10,
    views: 4100,
    tags: ['mindfulness', 'meditation', 'beginners'],
    featured: true,
    content: `Mindfulness is the practice of paying attention to the present moment with openness and without judgment. Research shows it can reduce stress, anxiety, and depression while improving focus and emotional regulation.

**What Mindfulness Is (and Isn't)**
Mindfulness is not about emptying your mind or achieving a special state. It is simply about noticing what is happening right now — your thoughts, feelings, and sensations — without getting caught up in them.

**Your First Mindfulness Practice: Breath Awareness**
1. Find a comfortable seated position
2. Set a timer for 5 minutes
3. Close your eyes or soften your gaze
4. Bring your attention to your breath — the sensation of air entering and leaving your nostrils
5. When your mind wanders (and it will), gently bring it back to the breath without judgment
6. Repeat

**Building a Daily Practice**
Start with just 5 minutes per day. Consistency matters more than duration. Try to practice at the same time each day — morning works well for many people.

**Mindfulness in Daily Life**
You can practice mindfulness during everyday activities:
- Mindful eating: eat slowly, savour each bite
- Mindful walking: notice the sensation of each step
- Mindful listening: give your full attention to conversations

**Common Challenges**
- "My mind won't stop" — This is normal. The practice is in noticing and returning, not in having a quiet mind
- "I don't have time" — Even 2 minutes counts
- "I'm not doing it right" — There is no wrong way to practice

With regular practice, most people notice benefits within 2–4 weeks.`,
  },
  {
    id: '5',
    title: '10 Self-Care Practices for Better Mental Health',
    category: 'Self-Care',
    type: 'Article',
    description: 'Simple, actionable self-care strategies you can start today to improve your mental wellbeing.',
    readTime: 5,
    views: 5200,
    tags: ['self-care', 'wellbeing', 'habits'],
    featured: true,
    content: `Self-care is not selfish — it is essential. Taking care of your mental health is just as important as taking care of your physical health. Here are 10 evidence-based self-care practices.

**1. Prioritise Sleep**
Aim for 7–9 hours of quality sleep. Create a consistent sleep schedule and a relaxing bedtime routine. Avoid screens for at least an hour before bed.

**2. Move Your Body**
Exercise releases endorphins and reduces stress hormones. You do not need a gym — a 30-minute walk, dancing, or yoga at home all count.

**3. Nourish Your Body**
What you eat affects how you feel. Aim for a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Stay hydrated.

**4. Connect with Others**
Social connection is a fundamental human need. Make time for meaningful relationships. Even a short conversation with a friend can boost your mood.

**5. Set Boundaries**
Learn to say no to things that drain your energy. Protecting your time and energy is an act of self-respect.

**6. Spend Time in Nature**
Research shows that spending time outdoors reduces cortisol levels and improves mood. Even 20 minutes in a park can make a difference.

**7. Practice Gratitude**
Write down 3 things you are grateful for each day. This simple practice rewires your brain toward positivity over time.

**8. Limit Social Media**
Excessive social media use is linked to increased anxiety and depression. Set time limits and be intentional about your consumption.

**9. Engage in Creative Activities**
Creative expression — drawing, writing, cooking, music — provides an outlet for emotions and promotes flow states.

**10. Seek Professional Support When Needed**
Recognising when you need help is a sign of strength, not weakness. Therapy, counseling, and support groups are valuable resources.`,
  },
  {
    id: '6',
    title: 'Building Healthy Relationships: Communication Skills That Work',
    category: 'Relationships',
    type: 'Guide',
    description: 'Learn the communication skills that strengthen relationships and reduce conflict.',
    readTime: 9,
    views: 1870,
    tags: ['relationships', 'communication', 'conflict'],
    content: `Healthy relationships are one of the strongest predictors of mental wellbeing. At the core of every healthy relationship is effective communication.

**Active Listening**
Most people listen to respond, not to understand. Active listening means giving your full attention, reflecting back what you hear, and asking clarifying questions before responding.

**Using "I" Statements**
Instead of "You always make me feel ignored," try "I feel hurt when I don't hear back from you." I-statements express your feelings without blaming the other person, making them less likely to become defensive.

**Managing Conflict Constructively**
- Choose the right time and place for difficult conversations
- Focus on the issue, not the person
- Take breaks when emotions run high
- Look for solutions, not winners

**Setting Healthy Boundaries**
Boundaries are not walls — they are guidelines for how you want to be treated. Communicate your boundaries clearly and respectfully, and honour others' boundaries in return.

**Recognising Unhealthy Patterns**
Watch for signs of unhealthy relationship dynamics:
- Constant criticism or contempt
- Stonewalling (refusing to engage)
- Defensiveness
- Controlling behaviour

**When to Seek Help**
If relationship problems are significantly affecting your mental health, couples therapy or individual counseling can provide valuable tools and perspective.`,
  },
  {
    id: '7',
    title: 'Body Scan Meditation for Stress Relief',
    category: 'Mindfulness',
    type: 'Exercise',
    description: 'A guided body scan exercise to release tension and promote deep relaxation.',
    readTime: 15,
    views: 2340,
    tags: ['meditation', 'relaxation', 'body scan'],
    content: `The body scan is a foundational mindfulness practice that involves systematically bringing attention to different parts of your body. It is particularly effective for releasing physical tension and promoting relaxation.

**How to Practice**
Find a comfortable position lying down or seated. Allow 15–20 minutes for this practice.

1. **Begin with breath** — Take 3 deep breaths, allowing your body to settle with each exhale.

2. **Start at your feet** — Bring your attention to your toes. Notice any sensations — warmth, tingling, pressure, or nothing at all. Simply observe without trying to change anything.

3. **Move slowly upward** — Gradually move your attention through your feet, ankles, calves, knees, thighs, hips, abdomen, chest, lower back, upper back, shoulders, arms, hands, neck, and finally your head and face.

4. **At each area** — Spend 30–60 seconds noticing sensations. If you notice tension, breathe into that area and imagine it softening on the exhale.

5. **When your mind wanders** — Gently return your attention to the body part you were focusing on.

6. **End with whole-body awareness** — Spend a few moments aware of your body as a whole, breathing naturally.

**Tips for Success**
- There is no right or wrong way to feel during a body scan
- If you fall asleep, that is okay — your body needed rest
- Regular practice (daily if possible) yields the best results
- You can use a guided recording to help you stay focused`,
  },
  {
    id: '8',
    title: 'Overcoming Negative Self-Talk: A Practical Guide',
    category: 'Self-Care',
    type: 'Guide',
    description: 'Learn to identify and challenge the inner critic that holds you back.',
    readTime: 7,
    views: 3100,
    tags: ['self-talk', 'inner critic', 'CBT', 'self-compassion'],
    content: `We all have an inner voice that comments on our experiences. For many people, this voice is predominantly critical and negative. Learning to challenge negative self-talk is a powerful skill for improving mental health.

**Common Types of Negative Self-Talk**
- **All-or-nothing thinking**: "I failed this test, I'm a complete failure"
- **Catastrophising**: "This went wrong, everything is ruined"
- **Mind reading**: "They didn't reply, they must hate me"
- **Personalisation**: "It rained on my event, it's my fault"
- **Should statements**: "I should be further along by now"

**The ABCDE Technique**
This CBT-based technique helps you challenge negative thoughts:
- **A**ctivating event: What happened?
- **B**elief: What did you tell yourself?
- **C**onsequence: How did you feel/behave?
- **D**ispute: What is the evidence for and against this belief?
- **E**ffective new belief: What is a more balanced perspective?

**Practising Self-Compassion**
Ask yourself: "What would I say to a good friend in this situation?" We are often far kinder to others than to ourselves. Treat yourself with the same compassion you would offer a friend.

**Building a Kinder Inner Voice**
- Notice negative self-talk without judgment
- Name it: "There's that critical voice again"
- Challenge it with evidence
- Replace it with a balanced, compassionate statement
- Practice regularly — this takes time`,
  },
]
