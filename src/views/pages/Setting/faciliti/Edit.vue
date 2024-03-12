<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <pageheader />
        <!-- /add -->
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
              <b-row>
                <b-col cols="12" class="d-flex justify-content-center mb-2">
                  <!-- media -->
                  <b-media no-body>
                    <b-media-aside>
                      <b-link>
                        <b-img
                          ref="previewEl"
                          rounded
                          height="80"
                          width="80"
                          :src="url"
                        />
                      </b-link>
                      <!--/ avatar -->
                    </b-media-aside>

                    <b-media-body class="mt-75 ml-75">
                      <!-- upload button -->
                      <b-button
                        variant="primary"
                        size="sm"
                        class="mb-75 mr-75"
                        @click="$refs.imgupload.$el.click()"
                      >
                        {{ $t("change") }}
                      </b-button>
                      <b-form-file
                        ref="imgupload"
                        accept=".jpg, .png, .gif"
                        :hidden="true"
                        plain
                        @change="onFileChanged"
                      />
                      <!--/ upload button -->
                    </b-media-body>
                  </b-media>
                  <!--/ media -->
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <gfield
                    label-text="code"
                    ref="code"
                    name="code"
                    id="code"
                    v-model="selectedItem.code"
                  />
                </b-col>
                <b-col md="4">
                  <!-- arabicName  -->
                  <gfield
                    id="arabicName"
                    rules="required"
                    v-model="selectedItem.arabicName"
                    label-text="arabicName"
                    ref="arabicName"
                  />
                </b-col>
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
                  <label
                    style="font-size: 14px; margin-bottom: 7px"
                    for="general"
                  >
                    {{ $t("general") }}
                  </label>
                  <b-form-group>
                    <b-form-checkbox
                      v-model="selectedItem.isShared"
                      class="mr-0 mt-50"
                      name="is-rtl"
                      inline
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group>
                    <label
                      style="font-size: 14px; margin-bottom: 7px"
                      for="customer"
                    >
                      {{ $t("notes") }}
                    </label>
                    <b-form-textarea
                      id="textarea"
                      v-model="selectedItem.notes"
                      label="Notes"
                      rows="3"
                      max-rows="6"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    v-permission="$route.meta.permission"
                    class="mx-2"
                    type="submit"
                    variant="primary"
                    data-action-type="save"
                  >
                    {{ $t("save") }}
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
export default {
  components: {},
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      selectedItem: {},
      items: [],
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id > 0) {
      this.getSelected();
    }
  },
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
      this.selectedItem.imageExtension = file.name.split(".").pop();
      this.toBase64(file)
        .then((file1) => {
          this.selectedItem.base64logo = file1.split(",").pop();
        })
        .then(() => {
          this.logoModel = {
            extension: this.selectedItem.imageExtension,
            base64Content: this.selectedItem.base64logo,
          };

          this.create({
            url: "Schools/@current/logo",
            data: this.logoModel,
          }).then((data) => {
            this.selectedItem.logoUrl = data;
          });
        });
      this.url = URL.createObjectURL(file);
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    save() {
      this.selectedItem.branchId = this.branchId;
      if (!this.selectedItem.englishName) {
        this.selectedItem.englishName = this.selectedItem.arabicName;
      }
      if (this.selectedItem.id > 0) {
        this.update({
          url: "Cities",
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t("updatedSuccessfully") });
          this.$router.push({ name: "cities" });
        });
      } else {
        this.create({
          url: "Cities",
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t("savedSuccessfully") });
          this.$router.push({ name: "cities" });
        });
      }
    },
    getSelected() {
      this.get({ url: "Cities", id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },
  },
};
</script>
    