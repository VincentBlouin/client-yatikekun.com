<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center mt-16 mb-16 pb-8"
  >
    <v-col cols="12" class="col-md-6 text-center">
      <v-card flat class="">
        <v-card-text class="text-center pb-0">
          <v-form ref="offerForm">
            <v-row>
              <v-col cols="12" class="right">
                <v-switch
                    v-model="offer.isAvailable"
                    :label="isAvailableLabel"
                    color="primary"
                    right
                    class="float-right"
                ></v-switch>
              </v-col>
            </v-row>
            <v-textarea
                v-model="offer.description"
                auto-grow
                full-width
                rows="2"
                :placeholder="$t('offer:description')"
                :rules="[rules.max255Char]"
            ></v-textarea>
            <h4 class="font-weight-regular text-left mb-4">Image</h4>
            <v-row class="vh-center">
              <v-col cols="12" class="vh-center">
                <v-skeleton-loader
                    type="card-avatar"
                    width="175"
                    height="175"
                    v-if="isSaving"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
            <img :src="getCurrentImageUrl()" v-if="!changeImageFlow && !isSaving" width="200px"/>
            <v-slide-group
                show-arrows
                v-model="selectedImage"
                v-if="changeImageFlow"
            >
              <v-slide-item
                  v-for="(image,imageIndex) in images"
                  :key="image.name"
                  v-slot="{ active}"
              >
                <v-badge icon="check" class="mt-4" overlap offset-x="40" offset-y="13" x-large right :value="active">
                  <v-card color="transparent" class="vh-center"
                          flat active-class="" style="height:100%;"
                          :class="{
                            'mr-4': $vuetify.breakpoint.mdAndUp,
                            'pr-0 mr-0': $vuetify.breakpoint.smAndDown
                          }"
                  >

                    <v-card-text class="black--text vh-center subtitle-1 pa-0"
                                 style="height:100%;cursor: pointer;width:150px"
                                 v-if="image.name === 'uploadImage' && !offer.customImage"
                                 @click="uploadImage(imageIndex)">
                      <v-icon>attach_file</v-icon>
                      {{ $t('offer:uploadImage') }}
                    </v-card-text>
                    <img
                        class="white--text"
                        v-if="image.name === 'uploadImage' && offer.customImage"
                        :src="getCurrentImageUrl(offer)"
                        width="175px"
                        @click="chooseCustomImage(imageIndex)"
                        style="cursor: pointer;"
                    />
                    <v-card-actions v-if="image.name === 'uploadImage' && offer.customImage" class="vh-center">
                      <v-btn color="primary" text @click="uploadImage(imageIndex);">
                        <v-icon class="mr-2">attach_file</v-icon>
                        {{ $t('offer:upload') }}
                      </v-btn>
                    </v-card-actions>
                    <img v-if="image.name !== 'uploadImage'" :input-value="active"
                         :src="getImageUrl(image)" width="175px"
                         class="pl-4 pr-4" :color="active ? undefined : 'grey lighten-1'"
                         @click="chooseImage(image, imageIndex)"
                         style="cursor: pointer;">
                  </v-card>
                </v-badge>
              </v-slide-item>
            </v-slide-group>
            <v-textarea
                v-model="offer.experience"
                auto-grow
                full-width
                rows="2"
                :placeholder="$t('offer:experience')"
                :rules="[rules.max255Char]"
            ></v-textarea>
            <v-textarea
                v-model="offer.additionalFees"
                auto-grow
                full-width
                rows="2"
                :placeholder="$t('offer:additionalFees')"
                :rules="[rules.max255Char]"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center vh-center pt-0" v-if="!changeImageFlow">
          <v-btn text @click="changeImageFlow=true" class="">
            <v-icon class="mr-2">edit</v-icon>
            {{ $t('offer:changeImage') }}
          </v-btn>
        </v-card-actions>
        <v-card-actions class="text-center vh-center pt-8">
          <v-btn color="primary" v-if="isCreate" @click="addOffer" :loading="submitLoading"
                 :disabled="submitLoading || !canAddOffer()">
            {{ $t('offer:addOffer') }}
          </v-btn>
          <v-btn color="primary" v-if="!isCreate" @click="modifyOffer" :loading="submitLoading"
                 :disabled="submitLoading || !canAddOffer()">
            {{ $t('offer:modifyOffer') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <input type="file" name="images" ref="uploadOfferImage"
             @change="filesChange($event.target.name, $event.target.files)"
             style="display: none;"/>
    </v-col>
    <v-snackbar
        v-model="modifiedMessage"
        color="primary"
        top
        :timeout="6000"
    >
      <span class="subtitle-1">
        {{ $t('offer:offerModified') }}
      </span>

      <template v-slot:action="{ attrs }">
        <v-btn
            dark
            text
            v-bind="attrs"
            @click="modifiedMessage = false"
        >
          {{ $t('close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import Images from '@/Images'
import OfferService from "@/offer/OfferService";
import Rules from "@/Rules";
import Offer from '@/offer/Offer'

const STATUS_INITIAL_UPLOAD = 0
const STATUS_SAVING_UPLOAD = 1
const STATUS_SUCCESS_UPLOAD = 2
const STATUS_FAILED_UPLOAD = 3
export default {
  components: {},
  async mounted() {
    this.offer.id = this.$route.params.offerId;
    if (!this.offer.id) {
      this.changeImageFlow = true;
      return
    }
    const response = await OfferService.get(this.offer);
    this.offer = Offer.format(response.data);
  },
  data: function () {
    I18n.i18next.addResources("fr", "offer", {
      title: "Nouvelle offre",
      imageLabel: "Image optionelle pour votre offre. Vous pouvez être créatif ou pas",
      description: "Votre offre",
      uploadImage: "Téléverser une image",
      modify: "Modifier",
      upload: "Téléverser",
      changeImage: "Changer l'image",
      addOffer: "Ajouter votre offre",
      modifyOffer: "Modifier votre offre",
      isAvailable: "Est disponible",
      isNotAvailable: "N'est pas disponible",
      offerModified: "Votre offre a été modifiée",
      experience: "Expérience",
      additionalFees: "Frais additionels"
    });
    I18n.i18next.addResources("en", "offer", {
      title: "Nouvelle offre",
      imageLabel: "Image optionelle pour votre offre. Vous pouvez être créatif",
      description: "Votre offre",
      uploadImage: "Téléverser une image",
      modify: "Modifier",
      upload: "Téléverser",
      changeImage: "Changer l'image",
      addOffer: "Ajouter votre offre",
      modifyOffer: "Modifier votre offer",
      isAvailable: "Est disponible",
      isNotAvailable: "N'est pas disponible",
      offerModified: "Votre offre a été modifiée",
      experience: "Expérience",
      additionalFees: "Frais additionels"
    });
    /*
      concat is to avoid re-adding uploadImage
    */
    const images = [].concat(Images.get());
    images.unshift({
      name: "uploadImage"
    });
    return {
      offer: {
        UserId: this.$store.state.user.id,
        description: "",
        isAvailable: true
      },
      isNewOffer: false,
      imageCarousel: 0,
      selectedImage: null,
      formatting: [],
      images: images,
      changeImageFlow: false,
      currentUploadStatus: STATUS_INITIAL_UPLOAD,
      submitLoading: false,
      modifiedMessage: false,
      rules: Rules
    }
  },
  methods: {
    canAddOffer: function () {
      return !this.isSaving && this.offer.description && (this.offer.image || this.offer.customImage);
    },
    addOffer: async function () {
      if (!this.$refs.offerForm.validate()) {
        return;
      }
      this.submitLoading = true;
      await OfferService.create(this.offer);
      this.submitLoading = false;
      await this.$router.push("/offres");
    },
    modifyOffer: async function () {
      this.submitLoading = true;
      await OfferService.update(this.offer);
      this.modifiedMessage = true;
      this.submitLoading = false;
    },
    getCurrentImageUrl() {
      if (this.offer.image) {
        return this.getImageUrl(this.offer.image);
      } else if (this.offer.customImage) {
        return this.getImageUrl(this.offer.customImage);
      } else {
        return "";
      }
    },
    getImageUrl(image) {
      return Images.getCustomBase64Url(image);
    },
    chooseImage: function (image, imageIndex) {
      this.offer.image = image;
      this.offer.customImage = undefined;
      this.selectedImage = imageIndex;
      this.changeImageFlow = false;
    },
    chooseCustomImage: function (imageIndex) {
      this.selectedImage = imageIndex;
      this.offer.image = undefined;
      this.changeImageFlow = false;
    },
    uploadImage: function (imageIndex) {
      this.selectedImage = imageIndex;
      this.$refs.uploadOfferImage.click();
    },
    reset() {
      // reset form to initial state
      this.currentUploadStatus = STATUS_INITIAL_UPLOAD
      this.uploadError = null
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name)
          })

      // save it
      this.save(formData)
    },
    async save(formData) {
      // upload data to the server
      this.currentUploadStatus = STATUS_SAVING_UPLOAD
      this.changeImageFlow = false;
      this.offer.image = undefined;
      const response = await OfferService.uploadImage(formData).catch((err) => {
        this.uploadError = err.response
        this.currentStcurrentUploadStatusatus = STATUS_FAILED_UPLOAD
      });
      setTimeout(() => {
        this.$set(this.offer, 'customImage', response.data)
        this.currentUploadStatus = STATUS_SUCCESS_UPLOAD
      }, 1000);
    }
  },
  computed: {
    isAvailableLabel: function () {
      return this.offer.isAvailable ?
          this.$t('offer:isAvailable') : this.$t('offer:isNotAvailable');
    },
    isOwner: function () {
      return this.offer.UserId === this.$store.state.user.id;
    },
    isCreate: function () {
      return this.offer.id === undefined
    },
    hasImage() {
      return this.offer.image || this.offer.customImage;
    },
    isInitial() {
      return this.currentUploadStatus === STATUS_INITIAL_UPLOAD
    },
    isSaving() {
      return this.currentUploadStatus === STATUS_SAVING_UPLOAD
    },
    isSuccess() {
      return this.currentUploadStatus === STATUS_SUCCESS_UPLOAD
    },
    isFailed() {
      return this.currentUploadStatus === STATUS_FAILED_UPLOAD
    }
  }
}
</script>
<style>
</style>
