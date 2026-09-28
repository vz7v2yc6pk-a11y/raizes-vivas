const renderGuardian = () => {
  const message = document.querySelector('.guardian-message');
  if (!message) return;
  message.setAttribute('data-visible', 'true');
};

window.addEventListener('DOMContentLoaded', () => {
  renderGuardian();
});
