import { Assessment } from '../services/assessment.service';

export const STATIC_ASSESSMENTS: Assessment[] = [
  {
    id: 'phq9',
    title: 'PHQ-9 Depression Screening',
    description: 'The Patient Health Questionnaire (PHQ-9) is a validated tool for screening and measuring the severity of depression.',
    category: 'Depression',
    questionCount: 9,
    estimatedMinutes: 5,
    questions: [
      { id: 'q1', text: 'Little interest or pleasure in doing things', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q2', text: 'Feeling down, depressed, or hopeless', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q4', text: 'Feeling tired or having little energy', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q5', text: 'Poor appetite or overeating', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q8', text: 'Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q9', text: 'Thoughts that you would be better off dead, or of hurting yourself in some way', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
    ],
  },
  {
    id: 'gad7',
    title: 'GAD-7 Anxiety Assessment',
    description: 'The Generalized Anxiety Disorder scale (GAD-7) is a widely used tool for screening and assessing the severity of anxiety.',
    category: 'Anxiety',
    questionCount: 7,
    estimatedMinutes: 4,
    questions: [
      { id: 'q1', text: 'Feeling nervous, anxious, or on edge', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q2', text: 'Not being able to stop or control worrying', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q3', text: 'Worrying too much about different things', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q4', text: 'Trouble relaxing', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q5', text: 'Being so restless that it is hard to sit still', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q6', text: 'Becoming easily annoyed or irritable', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
      { id: 'q7', text: 'Feeling afraid, as if something awful might happen', type: 'likert', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Several days' }, { value: 2, label: 'More than half the days' }, { value: 3, label: 'Nearly every day' }] },
    ],
  },
  {
    id: 'stress',
    title: 'Perceived Stress Scale',
    description: 'The PSS measures the degree to which situations in your life are appraised as stressful over the past month.',
    category: 'Stress',
    questionCount: 10,
    estimatedMinutes: 6,
    questions: [
      { id: 'q1', text: 'Been upset because of something that happened unexpectedly?', type: 'likert', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 3, label: 'Fairly often' }, { value: 4, label: 'Very often' }] },
      { id: 'q2', text: 'Felt that you were unable to control the important things in your life?', type: 'likert', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 3, label: 'Fairly often' }, { value: 4, label: 'Very often' }] },
      { id: 'q3', text: 'Felt nervous and stressed?', type: 'likert', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 3, label: 'Fairly often' }, { value: 4, label: 'Very often' }] },
      { id: 'q4', text: 'Felt confident about your ability to handle your personal problems?', type: 'likert', options: [{ value: 4, label: 'Never' }, { value: 3, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 1, label: 'Fairly often' }, { value: 0, label: 'Very often' }] },
      { id: 'q5', text: 'Felt that things were going your way?', type: 'likert', options: [{ value: 4, label: 'Never' }, { value: 3, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 1, label: 'Fairly often' }, { value: 0, label: 'Very often' }] },
      { id: 'q6', text: 'Found that you could not cope with all the things that you had to do?', type: 'likert', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 3, label: 'Fairly often' }, { value: 4, label: 'Very often' }] },
      { id: 'q7', text: 'Been able to control irritations in your life?', type: 'likert', options: [{ value: 4, label: 'Never' }, { value: 3, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 1, label: 'Fairly often' }, { value: 0, label: 'Very often' }] },
      { id: 'q8', text: 'Felt that you were on top of things?', type: 'likert', options: [{ value: 4, label: 'Never' }, { value: 3, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 1, label: 'Fairly often' }, { value: 0, label: 'Very often' }] },
      { id: 'q9', text: 'Been angered because of things that were outside of your control?', type: 'likert', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 3, label: 'Fairly often' }, { value: 4, label: 'Very often' }] },
      { id: 'q10', text: 'Felt difficulties were piling up so high that you could not overcome them?', type: 'likert', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Almost never' }, { value: 2, label: 'Sometimes' }, { value: 3, label: 'Fairly often' }, { value: 4, label: 'Very often' }] },
    ],
  },
];

export function calculateResult(assessmentId: string, answers: Record<string, number>) {
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const assessment = STATIC_ASSESSMENTS.find(a => a.id === assessmentId);
  const maxScore = assessmentId === 'stress' ? 40 : assessmentId === 'phq9' ? 27 : 21;
  const percentage = Math.round((score / maxScore) * 100);

  let severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  let interpretation: string;
  let recommendations: string[];

  if (assessmentId === 'phq9') {
    if (score <= 4) { severity = 'minimal'; interpretation = 'Minimal or no depression symptoms detected.'; recommendations = ['Maintain your current healthy habits', 'Continue regular exercise and social connection', 'Practice mindfulness or journaling'] }
    else if (score <= 9) { severity = 'mild'; interpretation = 'Mild depression symptoms. Worth monitoring.'; recommendations = ['Consider talking to a counselor', 'Increase physical activity', 'Reach out to supportive friends or family', 'Try mood tracking to identify patterns'] }
    else if (score <= 19) { severity = 'moderate'; interpretation = 'Moderate depression symptoms. Professional support is recommended.'; recommendations = ['Book a session with a therapist', 'Speak to a healthcare provider', 'Avoid isolation — stay connected with others', 'Consider structured therapy like CBT'] }
    else { severity = 'severe'; interpretation = 'Severe depression symptoms. Please seek professional help promptly.'; recommendations = ['Contact a mental health professional immediately', 'Call crisis line: 0800-800-2000', 'Do not face this alone — reach out to someone you trust', 'Book an urgent session with a therapist'] }
  } else if (assessmentId === 'gad7') {
    if (score <= 4) { severity = 'minimal'; interpretation = 'Minimal anxiety symptoms.'; recommendations = ['Keep up your current coping strategies', 'Practice deep breathing exercises', 'Maintain a regular sleep schedule'] }
    else if (score <= 9) { severity = 'mild'; interpretation = 'Mild anxiety. Some coping strategies may help.'; recommendations = ['Try mindfulness or meditation', 'Limit caffeine and alcohol', 'Talk to someone you trust about your worries', 'Consider journaling your thoughts'] }
    else if (score <= 14) { severity = 'moderate'; interpretation = 'Moderate anxiety. Professional support is recommended.'; recommendations = ['Book a session with a therapist', 'Learn relaxation techniques', 'Consider CBT for anxiety management', 'Speak to a healthcare provider'] }
    else { severity = 'severe'; interpretation = 'Severe anxiety. Please seek professional help.'; recommendations = ['Contact a mental health professional', 'Call crisis line: 0800-800-2000', 'Avoid making major decisions while highly anxious', 'Book an urgent therapy session'] }
  } else {
    if (score <= 13) { severity = 'minimal'; interpretation = 'Low perceived stress. You are managing well.'; recommendations = ['Keep up your current stress management habits', 'Continue regular exercise', 'Maintain work-life balance'] }
    else if (score <= 26) { severity = 'mild'; interpretation = 'Moderate perceived stress. Some areas need attention.'; recommendations = ['Identify your main stressors and address them', 'Practice time management techniques', 'Try relaxation exercises like yoga or meditation', 'Talk to someone about what is stressing you'] }
    else { severity = 'moderate'; interpretation = 'High perceived stress. Consider seeking support.'; recommendations = ['Book a session with a counselor', 'Prioritise self-care and rest', 'Delegate tasks where possible', 'Consider stress management therapy'] }
  }

  return {
    id: Date.now().toString(),
    assessmentId,
    assessmentTitle: assessment?.title || '',
    score,
    maxScore,
    percentage,
    severity,
    interpretation,
    recommendations,
    completedAt: new Date().toISOString(),
  };
}
