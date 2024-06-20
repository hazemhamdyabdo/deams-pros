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
                    />
                    <!-- danger -->
                    <b-alert
                      variant="danger"
                      :show="passwordHashConfirm !== selectedItem.passwordHash"
                    >
                      <div class="alert-body">
                        <span>{{ $t('passwordDonotMatched') }}</span>
                      </div>
                    </b-alert>
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
              </b-row>
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
                    {{ $t('save') }}
                  </b-button>
                  <b-button variant="outline-primary" @click="backToList()">
                    <vue-feather type="log-out" size="12" class="mx-1" />
                    {{ $t('backToPreview') }}
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
import VueDatePicker from '@/components/form/inputs/VDatePicker.vue';
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
      passwordHashConfirm: '',
      selectedBranches: [],
      branches: [],
      id: 0,
      selectedItem: {
        branches: [],
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
  watch: {},
  methods: {
    getBranches() {
      this.get({ url: 'Branches' }).then((data) => {
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
    save() {
      this.prepareBeforeSave();
      if (!this.selectedItem.englishName)
        this.selectedItem.englishName = this.selectedItem.arabicName;
      if (this.selectedItem.id > 0) {
        this.update({
          url: 'Users',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });
      } else {
        this.create({
          url: 'Users',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },
    getSelected() {
      this.get({ url: 'Users', id: this.id }).then((data) => {
        this.selectedItem = data;
        this.passwordHashConfirm = this.selectedItem.passwordHash;
      });
    },

    backToList() {
      this.$router.push({ name: 'user' });
    },
  },
};
</script>
