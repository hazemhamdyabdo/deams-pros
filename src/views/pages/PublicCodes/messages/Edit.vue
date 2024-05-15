<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <gform @submit="save()">
              <b-row>
                <!-- code -->
                <b-col 
                  v-if="selectedItem.id > 0"
                  md="3"  
                >
                  <gfield
                    label-text="code"
                    ref="code"
                    name="code"
                    id="code"
                    v-model="selectedItem.code"
                  />
                </b-col>

                <!-- companion.identityTypeId  -->
                <b-col md="3">
                    <gfield
                      label="arabicName"
                      field="select"  
                      id="messageType"           
                      name="messageType"
                      label-text="messageType"
                      v-model="selectedItem.messageTypeId"
                      :options="lookup.messageTypes"
                      :dir="'rtl'"
                      rules="required"
                    />
                  </b-col>

                <b-col md="12">
                  <b-form-group>
                    <label
                      style="font-size: 14px; margin-bottom: 7px"
                      for="messageContent"
                    >
                      {{ $t('messageContent') }}
                    </label>
                    <b-form-textarea
                      id="textarea"
                      v-model="selectedItem.messageContent"
                      label="Notes"
                      rows="5"
                      max-rows="6"
                    />
                    <small
                      class="textarea-counter-value"
                    > {{ selectedItem.messageContent.length }} / 1000
                    </small>
                    <small
                      v-if="this.selectedItem.messageContent.length > 1000"
                      class="float-right mt-2 text-danger"
                    > {{ this.$t('messageLengthValidation') }}
                    </small>
                  </b-form-group>
                </b-col>             
              </b-row>

              <!-- notes -->
              <b-row>
                <b-col md="12">
                  <b-form-group>
                    <label
                      style="font-size: 14px; margin-bottom: 7px"
                      for="notes"
                    >
                      {{ $t('notes') }}
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

              <!-- operations -->
              <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                  <b-button
                    type="submit"
                    class="me-2"
                    variant="primary"
                    data-action-type="save"
                  >
                    <vue-feather
                      type="check-circle"
                      size="12"
                      class="mx-1"
                    />
                    {{ $t('save') }}
                  </b-button>
                  <b-button
                    variant="outline-primary"
                    @click="backToList()"
                  >
                    <vue-feather
                      type="log-out"
                      size="12"
                      class="mx-1"
                    />
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
import 
{ messageTypes } from '@/libs/acl/Lookups';
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
      id: 0,
      selectedItem: {
        messageContent: ''
      },
      lookup: {
        messageTypes: messageTypes
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id > 0) {
      this.getSelected();
    }
  },
  methods: {
    prepareBeforeSave() {
      if (this.selectedItem.messageContent.trim().length === 0) {
        this.selectedItem.messageContent = messageTypes.find((el) => el.id === this.selectedItem.messageTypeId).arabicName
      }
    },

    validateBeforeSave() {
      if (this.selectedItem.messageContent.trim().length > 1000) return false;
      return true;
    },

    save() {
      this.prepareBeforeSave();
      if (!this.validateBeforeSave()) return;

      if (this.selectedItem.id > 0) {
        this.update({
          url: 'Messages',
          data: this.selectedItem,
          id: this.selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });
      } else {
        this.create({
          url: 'Messages',
          data: this.selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },
    getSelected() {
      this.get({ url: 'Messages', id: this.id }).then((data) => {
        this.selectedItem = data;
      });
    },

    backToList() {
      this.$router.push({ name: 'messages' });
    },
  },
};
</script>
