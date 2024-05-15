<template>
  <div class="main-wrapper">
  <div class="page-wrapper">
    <div class="content">
      <div class="card">
        <div class="card-body">
          <gform 
            class="guest-data" 
            @submit="save()">

           <!-- data tab -->
            <b-tabs
              content-class="pt-2"
              pills
              fill
            >

              <!-- for guest  -->
              <b-tab
                :title="$t('guestData')"
              >
                <b-row class="mt-1">
                  <!-- code  -->
                  <b-col 
                    v-if="_selectedItem.id > 0"
                    md="3"
                  >
                    <gfield
                      label-text="code"
                      name="code"
                      v-model="_selectedItem.code"
                    />
                  </b-col>

                  <!-- arabicName  -->
                  <b-col md="3">
                    <gfield
                      label-text="arabicName"
                      name="arabicName"
                      v-model="_selectedItem.arabicName"
                      rules="required|string"
                    />
                  </b-col>
                  
                  <!-- englishName  -->
                  <b-col md="3">
                    <gfield
                      label-text="englishName"
                      name="englishName"
                      v-model="_selectedItem.englishName"
                      :dir="'ltr'"
                    />
                  </b-col>

                  <!-- gender  -->
                  <b-col md="3">
                    <gfield
                      label="arabicName"           
                      field="select" 
                      id="genderId"
                      name="genderId"
                      label-text="gender"
                      rules="required"
                      v-model="_selectedItem.genderId"
                      :options="_lookup.genders"
                      :dir="'rtl'"
                    />
                  </b-col>

                  <!-- birthDate  -->
                  <b-col md="3">  
                    <VueDatePicker
                      label="birthDateAd"
                      v-model="_selectedItem.birthDateAd"
                    />
                  </b-col>

                  <!-- hijriBirthDate  -->
                  <b-col md="3">         
                    <gfield
                      v-model="_selectedItem.birthDateHijri"
                      label-text="birthDateHijri"
                      id="birthDateHijri"
                      name="birthDateHijri"
                      disabled="true"
                    />
                  </b-col>

                  <!-- nationality  -->
                  <b-col md="3">
                    <gfield
                      label="arabicName"
                      field="select"             
                      name="nationalityId"
                      label-text="nationality"
                      rules="required"
                      v-model="_selectedItem.nationalityId"
                      :options="_lookup.nationalities"
                      :dir="'rtl'"
                    />
                  </b-col>

                  <!-- guestTypeId  -->
                  <b-col md="3">
                    <gfield
                      label="arabicName"
                      field="select"             
                      name="guestTypeId"
                      label-text="guestType"
                      rules="required"
                      v-model="_selectedItem.guestTypeId"
                      :options="_lookup.guestTypes"
                      :dir="'rtl'"
                    />
                  </b-col>

                  <!-- identityTypeId  -->
                  <b-col md="3">
                    <gfield
                      label="arabicName"
                      field="select"          
                      id="identityTypeId"    
                      name="identityTypeId"
                      label-text="identityType"
                      rules="required"
                      v-model="_selectedItem.identityTypeId"
                      :options="_lookup.identityTypes"
                      :dir="'rtl'"
                      @change="resetIdentityContent"
                    />
                  </b-col>

                  <!-- identityContent  -->
                  <b-col 
                    md="3"
                  >
                    <gfield
                      :label-text="getIdentityContent"
                      name="identityContent"
                      v-model="_selectedItem.identityContent"
                      :rules="getRulesForIdentityContent"
                    />
                  </b-col>

                  <!-- mobileNumber  -->
                  <b-col md="3">
                    <gfield
                      label-text="mobileNumber"
                      name="mobileNumber"
                      v-model="_selectedItem.mobileNumber"
                      rules="required|numeric"
                    />
                  </b-col>

                  <!-- workMobileNumber  -->
                  <b-col md="3">
                    <gfield
                      label-text="workMobileNumber"
                      name="workMobileNumber"
                      v-model="_selectedItem.workMobile"
                      rules="numeric"
                    />
                  </b-col>

                  <!-- email  -->
                  <b-col md="3">
                    <gfield
                      label-text="email"
                      name="email"
                      v-model="_selectedItem.email"
                      rules="email"
                    />
                  </b-col>

                  <!-- address  -->
                  <b-col md="3">
                    <gfield
                      label-text="address"
                      v-model="_selectedItem.address"
                    />
                  </b-col>    
                </b-row>

                <b-row>
                  <!-- identity image upload -->
                  <b-col md="6">
                    <b-form-group>
                      <div class="d-flex justify-content-between">
                        <label style="margin-bottom: 10px;"> {{ $t('identityImage') }}</label>
                        <div v-if="_selectedItem.identityAttachmentName">
                          <b-button
                            v-if="_selectedItem.id > 0"
                            v-b-tooltip.hover.top="$t('downloadIdentityAttachment')"
                            class="me-2"
                            variant="outline-success"
                            style="font-size: 11px;"
                            @click="downloadAttachment()"
                          > 
                            <vue-feather
                              type="download"
                              size="12"
                            />
                              {{ $t('download') }}
                          </b-button>
                            <b-button
                              v-b-tooltip.hover.top="$t('removeIdentityAttachment')"
                              variant="outline-danger"
                              style="font-size: 11px;"
                              @click="deleteAttachment()"
                            > 
                            <vue-feather
                              type="trash-2"
                              size="12"
                            />
                            {{ $t('delete') }} 
                          </b-button>
                        </div>
                      </div>
                      <div class="image-upload">
                        <input 
                          type="file" 
                          style="height: 102px;" 
                          @change="handleFileInputChange"  
                          accept=".pdf, .jpg, .jpeg, .png"
                        />
                        <div class="image-uploads">
                          <img 
                            src="@/assets/img/icons/upload.svg" alt="upload-img" 
                          />
                          <h4>{{ _selectedItem.identityAttachmentName ? _selectedItem.identityAttachmentName : $t('dragAndDropFileToUpload') }}</h4>
                        </div>
                      </div>
                      <label 
                        class="d-block"
                        style="font-size: 13px; color: #b5b5b5; margin-top: -27px;"
                      > 
                        {{ $t('identityAttachmentMustBeInImageOrPdfFormat') }} 
                      </label>     
                    </b-form-group>
                  </b-col>

                  <!-- notes  -->
                  <b-col md="6">
                    <b-form-group>
                      <label
                        style="font-size: 15px; margin-bottom: 10px"
                        for="customer"
                      >
                        {{ $t('notes') }}
                      </label>
                      <b-form-textarea
                        id="textarea"
                        v-model="_selectedItem.notes"
                        label="Notes"
                        rows="4"
                        max-rows="6"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-tab>

              <!-- for companions  -->
              <b-tab   
                :title="$t('companionsData')"
              >
                <!-- companions preview  -->
                <b-row class="mb-4 mt-2">
                  <!-- companion.companionName  -->
                  <b-col md="3">
                      <gfield
                        label-text="companionName"
                        name="companionsArabicName"
                        v-model="_companion.companionName"
                      />
                    <label 
                      v-if="_helper.companionValidator.showForName.required || _helper.companionValidator.showForName.arabicOrEnglishOnly || _helper.companionValidator.showForName.unique"
                      style="margin-top: -15px;"
                      class="text-danger mb-3"
                    > 
                      {{ getValidatorMessageForComapnionName }} 
                    </label>
                  </b-col>

                  <!-- companion.relativeRelation  -->
                  <b-col md="3">
                    <gfield
                      label-text="relativeRelation"
                      v-model="_companion.relativeRelation"
                    />
                    <label 
                      v-if="_helper.companionValidator.showForRelativeRelation.required || _helper.companionValidator.showForRelativeRelation.arabicOrEnglishOnly"
                      style="margin-top: -15px;"
                      class="text-danger mb-3"
                    > 
                      {{ getValidatorMessageForComapnionRelationRelative }} 
                    </label>
                  </b-col>

                  <!-- companion.birthDate  -->
                  <b-col md="3">
                    <VueDatePicker
                      label="companionBirthdateAd"
                      v-model="_companion.birthDateAd"
                    />
                  </b-col>

                  <!-- companion.birthDateHijri  -->
                  <b-col md="3">
                    <gfield
                      label-text="companionBirthDateHijri"
                      id="companionbirthDateHijri"
                      name="companionBirthDateHijri"
                      v-model="_companion.birthDateHijri"
                      disabled
                    />
                  </b-col>

                  <!-- companion.gender  -->
                  <b-col md="3">
                    <gfield
                      label="arabicName"           
                      field="select" 
                      id="companionGenderId"
                      name="companionGenderId"
                      label-text="companionGender"
                      v-model="_companion.genderId"
                      :options="_lookup.genders"
                      :dir="'rtl'"
                    />
                    <label 
                      v-if="_helper.companionValidator.showForGender"
                      style="margin-top: -15px;"
                      class="text-danger mb-3"
                    > 
                      {{ this.$t('required') }} 
                    </label>
                  </b-col>

                  <!-- companion.identityTypeId  -->
                  <b-col md="3">
                    <gfield
                      label="arabicName"
                      field="select"  
                      id="companionsIdentityTypeId"           
                      name="companionsIdentityTypeId"
                      label-text="companionIdentityType"
                      v-model="_companion.identityTypeId"
                      :options="_lookup.identityTypes"
                      :dir="'rtl'"
                    />
                  </b-col>

                  <!-- companion.identityContent  -->
                  <b-col md="3">
                    <gfield
                      v-if="_companion.identityTypeId"
                      :label-text="getIdentityContentForCompanion"
                      name="companionsIdentityContent"
                      v-model="_companion.identityContent"
                    />
                    <label 
                      v-if="_helper.companionValidator.showForIdentityContent.required || _helper.companionValidator.showForIdentityContent.numericOnly"
                      style="margin-top: -15px;"
                      class="text-danger mb-3"
                    > 
                      {{ getValidatorMessageForComapnionIdentityContent }} 
                    </label>
                  </b-col>

                  <b-col cols="12">
                    <b-button
                      v-if="_helper.operationsVisibility.showReset"
                      variant="secondary"
                      class="mt-2"
                      @click="reset()"
                    >
                      <vue-feather
                        type="rotate-ccw"
                        size="12"
                        class="mx-1"
                      />
                      {{ $t('reset') }}
                    </b-button>

                    <b-button
                      v-if="_helper.operationsVisibility.showEdit"
                      variant="secondary"
                      class="mt-2"
                      @click="updateCompanion()"
                    >
                      <vue-feather
                        type="edit-3"
                        size="12"
                        class="mx-1"
                      />
                      {{ $t('saveUpdatesOnCompanion') }}
                    </b-button>

                    <b-button
                      v-if="_helper.operationsVisibility.showAdd"
                      variant="secondary"
                      class="mt-2"
                      @click="addCompanionToList()"
                    >
                      <vue-feather
                        type="plus-circle"
                        size="14"
                        class="mx-1"
                      />
                      {{ $t('addToCompanionList') }}
                    </b-button>
                  </b-col>
                </b-row>

                <b-row class="mb-4">         
                  <b-col>
                    <b-table
                      ref="guestCompanions-table"
                      :items="Array.from(_companionsList)"
                      :fields="companionColumns"
                      perPage="25"
                      currentpage="1"
                      small
                      show-empty
                      hover
                      responsive
                      stickyColumn
                      :empty-text="$t('noCompaninonsAdded')"
                    >
                      <template #head(actions)>
                        <span></span>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-nowrap">
                          <b-button
                            v-b-tooltip.hover.top="$t('previewCompanion')"
                            variant="outline-primary"
                            class="me-2"
                            size="sm"
                            @click="preview(item)"
                          >
                            <vue-feather
                              type="eye"
                              size="12"
                            />
                          </b-button>

                          <b-button
                            v-b-tooltip.hover.top="$t('editCompanion')"
                            variant="outline-secondary"
                            class="me-2"
                            size="sm"
                            @click="edit(item)"
                          >
                            <vue-feather
                              type="edit-3"
                              size="12"
                            />
                          </b-button>

                          <b-button
                            v-b-tooltip.hover.top="$t('removeFromCompanionList')"
                            variant="outline-danger"
                            size="sm"
                            @click="removeFromList(item)"
                          >
                            <vue-feather
                              type="x"
                              size="12"
                            />
                          </b-button>
                        </div>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>

            <!-- buttons -->
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
// imported Files
import 
{ 
  genders, 
  guestTypes,
  identityTypes
} from '@/libs/acl/Lookups';
import 
{ 
  isStringOnly,
  isNumericOnly
} from '@/mixin/publicMethods';
import saveAs from 'file-saver';
import VueDatePicker from "@/components/form/inputs/VDatePicker.vue";

export default {
  // components
  components: {
    VueDatePicker,
  },

  // props section
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },

  // data section
  data() {
    return {
      _selectedItem: {
        identityAttachmentName: '',
        identityAttachmentFileExtension: '',
        identityAttachmentBase64Content: '',
        englishName: '',
        birthDateAd: null,
        guestCompanions: []
      },
      _lookup: {
        genders: genders,
        guestTypes: guestTypes,
        identityTypes: identityTypes,
        nationalities: []
      },
      _companion: {},
      _companionsList: [],
      _helper: {
        operationsVisibility: {
          showEdit: false,
          showAdd: true,
          showReset: false,
        },
        companionValidator: {
          showForName: 
          {
            required: false,
            arabicOrEnglishOnly: false,
            unique: false
          },
          showForRelativeRelation: 
          {
            required: false,
            arabicOrEnglishOnly: false
          },
          showForBirthDateAd: false,
          showForGender: false,
          showForIdentityContent: 
          {
            required: false,
            numericOnly: false
          },
        }
      },
      _title: 'guests',
      _title1: '',
      _id: 0,
    };
  },

  watch: {
    '_selectedItem.birthDateAd'(adDate) {
      this._selectedItem.birthDateHijri = this.adDateToHijriDate(adDate)
    },
    
    '_companion.companionName'() {
      this._helper.companionValidator.showForName = {
        required: false,
        arabicOrEnglishOnly: false,
        unique: false
      }
    },

    '_companion.relativeRelation'() {
      this._helper.companionValidator.showForRelativeRelation = {
        required: false,
        arabicOrEnglishOnly: false
      }
    },

    '_companion.birthDateAd'(adDate) {
      if(adDate) {
        this._companion.birthDateHijri = this.adDateToHijriDate(adDate)
      }
      this._helper.companionValidator.showForBirthDateAd = false
    },

    '_companion.genderId'() {
      this._helper.companionValidator.showForGender = false
    },

    '_companion.identityContent'() {
      this._helper.companionValidator.showForIdentityContent = {
        required: false,
        arabicOrEnglishOnly: false
      }
    }
  },

  computed: {
    roomStatusOptions() {
      return [
        { text: this.$t('clean'), value: true },
        { text: this.$t('notClean'), value: false },
      ];
    },

    companionColumns() {
      return [
        {
          key: 'serialNo',
          label: this.$t('serial'),
        },
        {
          key: 'companionName',
          label: this.$t('companionName'),
        },
        {
          key: 'relativeRelation',
          label: this.$t('relativeRelation'),
        },
        {
          key: 'birthDate',
          label: this.$t('companionBirthdateAd'),
        },
        {
          key: 'gender',
          label: this.$t('companionGender'),
        },
        {
          key: 'identityType',
          label: this.$t('companionIdentityType'),
        },
        {
          key: 'identityContent',
          label: this.$t('companionIdentityNumber'),
        },
        {
          key: 'actions'
        }
      ];
    },

    getIdentityContent() {
      switch (this._selectedItem.identityTypeId) {
        case 'residency':
          return this.$t('residencyNumber')

        case 'visitor':
          return this.$t('visaNumber')

        case 'passport':
        return this.$t('passportNumber')
          
        default:
          return this.$t('nationalIdentityNumber')
      }
    },

    getIdentityContentForCompanion() {
      switch (this._companion.identityTypeId) {
        case 'residency':
          return this.$t('residencyNumberForCompanion')

        case 'visitor':
          return this.$t('visaNumberForCompanion')

        case 'passport':
          return this.$t('passportNumber')
          
        default:
          return this.$t('nationalIdentityNumberForCompanion')
      }
    },

    getRulesForIdentityContent() {
      return {
        required: this._selectedItem.identityTypeId,
         numeric: this._selectedItem.identityTypeId === 'nationalIdentity' || 
                  this._selectedItem.identityTypeId === 'residency' || 
                  this._selectedItem.identityTypeId === 'visitor'     
      }
    },

    getValidatorMessageForComapnionName() {
      if (this._helper.companionValidator.showForName.required) return this.$t('required')
      else if (this._helper.companionValidator.showForName.arabicOrEnglishOnly) return this.$t('mustContainOnlyArabicOrEnglishCharcters')
      else if (this._helper.companionValidator.showForName.unique) return this.$t('companionNameAlreadyExists')
      else return ''
    },

    getValidatorMessageForComapnionRelationRelative() {
      if (this._helper.companionValidator.showForRelativeRelation.required) return this.$t('required')
      else if (this._helper.companionValidator.showForRelativeRelation.arabicOrEnglishOnly) return this.$t('mustContainOnlyArabicOrEnglishCharcters')
      else return ''
    },

    getValidatorMessageForComapnionIdentityContent() {
      if (this._helper.companionValidator.showForIdentityContent.required) return this.$t('required')
      else if (this._helper.companionValidator.showForIdentityContent.numericOnly) return this.$t('mustBeNumericOnly')
      else return ''
    } 
  },

  // mounted section
  mounted() {
    this._id = this.$route.params.id;
    this._title1 = this._id > 0 ? 'editGuest' : 'addGuest';
    this._selectedItem.birthDateAd = this.getDate();
    this._selectedItem.birthDateHijri = this.adDateToHijriDate();
    this._companion.birthDateAd = this.getDate();
    this._companion.birthDateHijri = this.adDateToHijriDate();

    this.getLookups();
    if (this._id > 0) {
      this.getSelectedItem();
    }
  },

  // methods section
  methods: {
    handleFileInputChange(event) {
      if(event.target.files[0] && this.validateFile(event.target.files[0])) {
        const file = event.target.files[0];
        this._selectedItem.identityAttachmentName = file.name;
        this._selectedItem.identityAttachmentFileExtension = file.name.split(".").pop().toLowerCase();;
        this.toBase64(file).then((fileBase) => {
          this._selectedItem.identityAttachmentBase64Content = fileBase.split(',').pop();
        });
      } else {
        event.target.value = '';
      }
    },

    validateFile(file) {
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      const extension = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(extension);
    },

    save() {
      // update
      if (this._selectedItem.id > 0) {
        this.update({
          url: 'Guests',
          data: this._selectedItem,
          id: this._selectedItem.id,
        }).then(() => {
          this.doneAlert({ text: this.$t('updatedSuccessfully') });
          this.backToList();
        });

        // insert
      } else {
        this.perpareForCreate();
        this.create({
          url: 'Guests',
          data: this._selectedItem,
        }).then(() => {
          this.doneAlert({ text: this.$t('savedSuccessfully') });
          this.backToList();
        });
      }
    },

    perpareForCreate() {
      if (!this._selectedItem.englishName) this._selectedItem.englishName = this._selectedItem.arabicName
    },

    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    getLookups() {
      this.get({ url: "Nationalities" }).then((data) => {
        this._lookup.nationalities = data;
      });
    },

    getSelectedItem() {
      this.get({ url: 'Guests', id: this._id }).then((data) => {
        this._selectedItem = data;
        this._selectedItem.birthDateAd = new Date(this._selectedItem.birthDateAd);
        this._selectedItem.guestCompanions.forEach(element => {
          element.birthDateAd = new Date(element.birthDateAd);
          this._companionsList.push({
            serialNo: element.lineSerial,
            companionName: element.companionName,
            relativeRelation: element.relativeRelation,
            birthDate: this.getDate(element.birthDateAd),
            gender: genders.find((val) => val.id === element.genderId).arabicName,
            identityType: !element.identityTypeId ? null : identityTypes.find((val) => val.id === element.identityTypeId).arabicName,
            identityContent: element.identityContent
          });
        });
      });
    },

    backToList() {
      this.$router.push({ name: 'guest' });
    },

    maintianSerials() {
      for (let index = 0; index < this._companionsList.length; index++) {
        this._companionsList[index].serialNo = index+1;    
      }
    },

    getRulesForIdentityContentForCompanion() {
      return {
         isNumeric: this._companion.identityTypeId === 'nationalIdentity' || 
                    this._companion.identityTypeId === 'residency' || 
                    this._companion.identityTypeId === 'visitor'     
      }
    },

    isCompanionUnique() {
      return !this._companionsList.find((x) => x.companionName === this._companion.companionName.trim() && x.serialNo !== this._companion.serialNo)
    },
    
    isValidCompanion() {
      let isValid = true

      // for comapinion name
      if (!this._companion.companionName) {
        this._helper.companionValidator.showForName.required = true;
        isValid = false
      }
      else if (!isStringOnly(this._companion.companionName)) {
        this._helper.companionValidator.showForName.arabicOrEnglishOnly = true;
        isValid = false
      }
      else if (!this.isCompanionUnique()) {
        this._helper.companionValidator.showForName.unique = true;
        isValid = false
      }

      // for companion relation relative
      if (!this._companion.relativeRelation) {
        this._helper.companionValidator.showForRelativeRelation.required = true;
        isValid = false
      }
      else if (!isStringOnly(this._companion.relativeRelation)) {
        this._helper.companionValidator.showForRelativeRelation.arabicOrEnglishOnly = true;
        isValid = false
      }

      // for companion birthDateAd
      if (!this._companion.birthDateAd) {
        this._helper.companionValidator.showForBirthDateAd = true;
        isValid = false
      }

      // for companion gender
      if (!this._companion.genderId) {
        this._helper.companionValidator.showForGender = true;
        isValid = false
      }
      
      // for companion identity
      if (this._companion.identityTypeId && !this._companion.identityContent) {
        this._helper.companionValidator.showForIdentityContent.required = true;
        isValid = false
      }
      else if (this._companion.identityTypeId && this.getRulesForIdentityContentForCompanion().isNumeric && !isNumericOnly(this._companion.identityContent)) {
        this._helper.companionValidator.showForIdentityContent.numericOnly = true;
        isValid = false
      }
      
      return isValid
    },

    addCompanionToList() {
      if(!this.isValidCompanion()) {
        return;
      }
      this._selectedItem.guestCompanions.push(this._companion);
      this._companionsList.push({
        serialNo: this._companionsList.length + 1,
        companionName: this._companion.companionName,
        relativeRelation: this._companion.relativeRelation,
        birthDate: this.getDate(this._companion.birthDateAd),
        gender: genders.find((val) => val.id === this._companion.genderId).arabicName,
        identityType: !this._companion.identityTypeId ? null : identityTypes.find((val) => val.id === this._companion.identityTypeId).arabicName,
        identityContent: this._companion.identityContent
      });

      this.reset();
    },

    preview(item) {
      this._companion = this._selectedItem.guestCompanions.find(x => x.companionName === item.companionName);
      this._helper.operationsVisibility = {
        showEdit: false,
        showAdd: false,
        showReset: true
      }
    },

    edit(item) {
      this._companion = this._selectedItem.guestCompanions.find(x => x.companionName === item.companionName);
      this._companion.serialNo = item.serialNo;
      this._helper.operationsVisibility = {
        showEdit: true,
        showAdd: false,
        showReset: false
      }
    },

    removeFromList(item) {
      const elementIndex = this._selectedItem.guestCompanions.findIndex(x => x.companionName === item.companionName);
      if(elementIndex !== -1) {
        this._selectedItem.guestCompanions.splice(elementIndex, 1)
        this._companionsList.splice(elementIndex, 1)
      }

      this.reset();
      this.maintianSerials();
    },

    updateCompanion() {
      if (!this.isValidCompanion()) return;
      const elementIndex = this._selectedItem.guestCompanions.findIndex(x => x.companionName === this._companion.companionName);
      if (elementIndex !== -1) {
        this._companionsList[elementIndex] = {
          serialNo: this._companion.serialNo,
          companionName: this._companion.companionName,
          relativeRelation: this._companion.relativeRelation,
          birthDate: this.getDate(this._companion.birthDateAd),
          gender: genders.find((val) => val.id === this._companion.genderId).arabicName,
          identityType: !this._companion.identityTypeId ? null : identityTypes.find((val) => val.id === this._companion.identityTypeId).arabicName,
          identityContent: this._companion.identityContent
        }
      }

      this.reset();
    },

    reset() {
      this._companion = {}
      this._helper = {
        operationsVisibility: {
          showEdit: false,
          showAdd: true,
          showReset: false
        },
        companionValidator: {
          showForName: {
            required: false,
            arabicOrEnglishOnly: false,
            unique: false
          },
          showForRelativeRelation: {
            required: false,
            arabicOrEnglishOnly: false
          },
          showForBirthDateAd: false,
          showForGender: false,
          showForIdentityContent: {
            required: false,
            numericOnly: false
          }
        }    
      }
    },

    adDateToHijriDate(adDate = new Date()) {
       return new Intl.DateTimeFormat('ar-TN-u-ca-islamic', 
        {
          day: 'numeric', 
          month: 'long', 
          weekday: 'long', 
          year: 'numeric'
        }
      ).format(new Date(adDate));
    },

    downloadAttachment() {
      const path = this._selectedItem.identityAttachmentUrl.split('.')[1];
      saveAs(`${this.baseUrl}${this._selectedItem.identityAttachmentUrl}`, `${this._selectedItem.identityAttachmentName}`);
    },

    deleteAttachment() {
      this._selectedItem.identityAttachmentFileExtension = null;
      this._selectedItem.identityAttachmentBase64Content = null;
      this._selectedItem.identityAttachmentName = null;
    }
  },
};
</script>

<style>
.guest-data .nav-link.active {
  color: #fff !important;
  background-color: #fe9f43;
}

.guest-data .nav-item .nav-link {
  color: #fe9f43;
  font-weight: bold;
  border: 1px solid #fe9f43;
  margin: 3px;
}

.v3dp__popout[data-v-2e128338] {
  z-index: 1000;
}
</style>