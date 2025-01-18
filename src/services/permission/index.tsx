class PermissionService {
  async checkPermission(authToken: any, resource: any, action: any) {
    console.log(authToken, resource, action);
    return new Promise((resolve) => {
      setTimeout(() => {
        // rej({ message: "Don't have Permission" });
        resolve({ view: true, edit: true });
      }, 2000);
    });
  }
}
const Permission = new PermissionService();
export default Permission;
