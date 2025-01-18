export const goDashboard = (navigate: any) => {
  navigate('/');
};
export const handleLoginMutated = (
  loginMutation: any,
  i18n: any,
  showNotification: any,
  navigate: any
) => {
  if (loginMutation.isSuccess) {
    showNotification({
      summary: i18n.t('Login.summary'),
      detail: i18n.t('Login.success'),
    });
    localStorage.setItem('token', loginMutation.data.data.token as string);
    setTimeout(() => {
      goDashboard(navigate);
    }, 1000);
  }
  if (loginMutation.isError) {
    showNotification({
      severity: 'error',
      summary: 'Error',
      detail: loginMutation.error.message,
    });
  }
};
