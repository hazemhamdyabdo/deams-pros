import { PROFILE_KEY } from "@/libs/acl/config";
export default {
  created(el, binding, vnode) {
    const bindedPermission = binding.value;
    const profileData = JSON.parse(
      window.localStorage.getItem(PROFILE_KEY) || "{}"
    );
    if (profileData.isAdmin) return;
    if (
      bindedPermission &&
      profileData.permissions &&
      profileData.permissions.indexOf(bindedPermission) === -1
    ) {
      el.style.display = "none";
    }
  },
};
