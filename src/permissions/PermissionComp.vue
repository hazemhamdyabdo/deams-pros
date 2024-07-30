<template>
  <div>
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
              isCollapse ? 'icon ion-chevron-up' : 'icon ion-chevron-down'
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
                <b-tr v-for="(permission, i) in allPermissions" :key="i">
                  <b-td class="fw-bold">
                    {{ $t(permission.name) }}
                  </b-td>
                  <b-td v-for="(role, j) in permission.roles" :key="j">
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
</template>

<script>
import AllPermissions from "@/libs/acl/permissionLookups.js";

export default {
  setup() {
    return {
      isCollapse: false,
      allPermissions: AllPermissions,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
