<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
              <b-row>
                <!-- code -->
                <b-col md="4">
                  <gfield
                    label-text="code"
                    ref="code"
                    name="code"
                    id="code"
                    v-model="selectedItem.code"
                  />
                </b-col>

                <!-- arabicName  -->
                <b-col md="4">
                  <gfield
                    id="arabicName"
                    rules="required"
                    v-model="selectedItem.arabicName"
                    label-text="arabicName"
                    ref="arabicName"
                  />
                </b-col>

                <!-- englishName -->
                <b-col md="4">
                  <gfield
                    id="englishName"
                    ref="englishName"
                    v-model="selectedItem.englishName"
                    name="englishName"
                    label-text="englishName"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <gfield
                    id="userName"
                    ref="userName"
                    v-model="selectedItem.userName"
                    name="userName"
                    label-text="userName"
                    rules="required"
                  />
                </b-col>
                <b-col md="4">
                  <gfield
                    id="password"
                    ref="password"
                    type="password"
                    v-model="selectedItem.passwordHash"
                    name="password"
                    label-text="password"
                    rules="required"
                  />
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <gfield
                      id="userName"
                      ref="userName"
                      v-model="passwordHashConfirm"
                      name="userName"
                      label-text="confirmPassword"
                      type="password"
                      :rules="`confirmed:${selectedItem.passwordHash}`"
                    />
                    <!-- danger -->
                    <!-- <b-alert
                      variant="danger"
                      :show="passwordHashConfirm !== selectedItem.passwordHash"
                    >
                      <div class="alert-body">
                        <span>{{ $t("passwordDonotMatched") }}</span>
                      </div>
                    </b-alert> -->
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <gfield
                    id="phone"
                    ref="phone"
                    v-model="selectedItem.phone"
                    name="phone"
                    label-text="phone"
                  />
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <gfield
                      v-model="selectedBranches"
                      :dir="isRight ? 'rtl' : 'ltr'"
                      :options="branches"
                      label-text="branches"
                      field="select"
                      label="arabicName"
                      :rules="selectedItem.isAdmin ? '' : 'required'"
                      multiple
                    />
                  </b-form-group>
                </b-col>
                <!-- is admin -->
                <b-col md="4">
                  <div
                    class="admin my-auto mt-4"
                    style="display: flex; gap: 15px; align-items: center"
                  >
                    <label for="adminBox">{{ $t("isadmin") }}</label>
                    <input
                      type="checkbox"
                      id="adminBox"
                      v-model="selectedItem.isAdmin"
                    />
                  </div>
                </b-col>
              </b-row>
              <!-- permissions -->
              <div v-if="!selectedItem.isAdmin">
                <b-button
                  v-b-toggle="'collapse-2'"
                  class="m-1 mb-4"
                  style="width: 100%; background-color: #ff9e439d; border: none"
                  @click="isCollapse = !isCollapse"
                >
                  <div style="display: flex; justify-content: space-between">
                    <span> {{ $t("all roles") }} </span>
                    <span>
                      <i
                        :class="`${
                          isCollapse
                            ? 'icon ion-chevron-up'
                            : 'icon ion-chevron-down'
                        }`"
                      >
                      </i
                    ></span>
                  </div>
                </b-button>

                <b-collapse id="collapse-2">
                  <b-card>
                    <div class="permission-body">
                      <p class="roles-header text-white fw-bold">
                        {{ $t("permissions") }}
                      </p>
                      <div>
                        <b-table-simple>
                          <b-thead>
                            <b-th style="width: 40%"> </b-th>
                            <b-th> {{ $t("view") }} </b-th>
                            <b-th> {{ $t("add") }} </b-th>
                            <b-th> {{ $t("edit") }} </b-th>
                            <b-th> {{ $t("delete") }} </b-th>
                          </b-thead>
                          <b-tbody>
                            <b-tr
                              v-for="(permission, i) in allPermissions"
                              :key="i"
                            >
                              <b-td class="fw-bold">
                                {{ $t(permission.name) }}
                              </b-td>
                              <b-td
                                v-for="(role, j) in permission.roles"
                                :key="j"
                              >
                                <b-form-checkbox
                                  :checked="isChecked(role.id)"
                                  class="mx-auto"
                                  name="check-button"
                                  switch
                                  @change="identifyPermissions(role.id, $event)"
                                >
                                </b-form-checkbox>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </div>
                    </div>
                  </b-card>
                </b-collapse>
              </div>

              <!-- operations -->
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    type="submit"
                    class="me-2"
                    variant="primary"
                    data-action-type="save"
                  >
                    <vue-feather type="check-circle" size="12" class="mx-1" />
                    {{ $t("save") }}
                  </b-button>
                  <b-button variant="outline-primary" @click="backToList()">
                    <vue-feather type="log-out" size="12" class="mx-1" />
                    {{ $t("backToPreview") }}
                  </b-button>
                </b-col>
              </b-row>
            </gform>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@/components/form/inputs/VDatePicker.vue";
import AllPermissions from "@/libs/acl/permissionLookups.js";
export default {
  components: {
    VueDatePicker,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      isCollapse: false,
      allPermissions: AllPermissions,
      passwordHashConfirm: "",
      selectedBranches: [],
      branches: [],
      id: 0,
      userPermissions: [],
      selectedItem: {
        branches: [],
        permissions: [],
        isAdmin: false,
      },
    };
  },
  mounted() {
    this.inLoad();
    this.getBranches();
    if (this.id > 0) {
      this.getSelected();
    }
  },
  watch: {
    selectedBranches: {
      handler(newVal, oldVal) {
        this.selectedItem.branches = newVal.map((e) => ({
          branchId: Number(e),
          userId: Number(this.id > 0 ? this.id : 0),
          isDefault: false,
        }));
      },
      deep: true,
    },
    userPermissions: {
      handler(newVal, oldVal) {
        this.selectedItem.permissions = newVal.map((e) => ({
          userId: Number(this.id > 0 ? this.id : null),
          permissionId: e,
        }));
      },
      deep: true,
    },
  },
  methods: {
    getBranches() {
      this.get({ url: "Branches" }).then((data) => {
        this.branches = data;
      });
    },
    prepareBeforeSave() {
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
    },
    inLoad() {
      this.id = this.$route.params.id;
    },
    isChecked(id) {
      return this.userPermissions.includes(id);
    },
    identifyPermissions(id, status) {
      if (status) {
        this.userPermissions.push(id);
      } else {
        this.userPermissions = this.userPermissions.filter((el) => el !== id);
      }
    },
    save() {
      this.prepareBeforeSave();
      if (!this.selectedItem.englishName)
        this.selectedItem.englishName = this.selectedItem.arabicName;

      if (this.selectedItem.id > 0) {
        this.update({
          url: "Users",
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t("updatedSuccessfully") });
          this.backToList();
        });
      } else {
        this.create({
          url: "Users",
          data: this.selectedItem,
        })
          .then(() => {
            this.doneAlert({ text: this.$t("savedSuccessfully") });
            this.backToList();
          })
          .catch(({ e }) => {
            this.selectedItem = [];
            this.passwordHashConfirm = "";
            this.selectedBranches = [];
            this.selectedBranches = [];
            this.doneAlert({
              type: "error",
              text: this.$t("Failed to create user"),
            });
          });
      }
    },
    getSelected() {
      this.get({ url: "Users", id: this.id }).then((data) => {
        this.selectedItem = data;
        this.passwordHashConfirm = this.selectedItem.passwordHash;
        this.selectedItem.isAdmin = data.isAdmin;
        this.userPermissions = data.permissions.map((e) => e.permissionId);
        this.selectedBranches = data.branches.map((e) => e.branchId);
      });
    },

    backToList() {
      this.$router.push({ name: "user" });
    },
  },
};
</script>

<style scoped>
.permission-body {
  background-color: #ff9e439d;
  border-radius: 9px;
  padding: 10px;
  margin-bottom: 15px;
}
.roles-header {
  font-size: 14px;
}
.roles-body {
  border-radius: 9px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
}
</style>
