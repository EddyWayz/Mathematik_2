/**
 * Initializes interactive task elements.
 * It handles user input for tasks and provides immediate feedback
 * based on whether the input matches the predefined answer.
 */
export default function initTasks() {
  const tasks = document.querySelectorAll('.task[data-answer]');
  tasks.forEach((task) => {
    const input = task.querySelector('input');
    const button = task.querySelector('button');
    const feedback = task.querySelector('.feedback');
    if (!input || !button || !feedback) return;
    feedback.setAttribute('aria-live', 'polite');
    button.addEventListener('click', () => {
      if (input.value.trim() === task.dataset.answer) {
        feedback.textContent = '✅';
        feedback.style.color = 'green';
      } else {
        feedback.textContent = '❌';
        feedback.style.color = 'red';
      }
    });
  });
}
