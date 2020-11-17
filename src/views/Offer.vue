<template>
  <v-row
      align="center"
      justify="center"
      class="vh-center"
  >
    <v-col cols="12" class="col-md-6 text-center">
      <v-card flat class="">
        <v-card-text class="text-left pb-0">
          <v-form ref="offerForm">
            <v-textarea
                v-model="offer.description"
                auto-grow
                full-width
                rows="2"
                :placeholder="$t('offer:description')"
            ></v-textarea>
            <h4 class="font-weight-regular text-left mb-4">Image</h4>
            <v-skeleton-loader
                type="card-avatar"
                width="150"
                height="150"
                v-if="isSaving"
            ></v-skeleton-loader>
            <img :src="getImageUrl()" v-if="!changeImageFlow" width="175px"/>
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
                  <v-card color="transparent" class="vh-center mr-4 mr-4"
                          width="175px" flat active-class="" style="height:100%;">

                    <v-card-text class="black--text vh-center subtitle-1" style="height:100%;cursor: pointer;"
                                 v-if="image.name === 'uploadImage' && !offer.customImage"
                                 @click="uploadImage(imageIndex)">
                      <v-icon>attach_file</v-icon>
                      {{ $t('offer:uploadImage') }}
                    </v-card-text>
                    <img
                        class="white--text"
                        v-if="image.name === 'uploadImage' && offer.customImage"
                        :src="OfferService.getImageUrl(offer)"
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
                         :src="require('@/assets/categories/' + image.file)" width="175px"
                         class="pl-4 pr-4" :color="active ? undefined : 'grey lighten-1'"
                         @click="chooseImage(image, imageIndex)"
                         style="cursor: pointer;">
                  </v-card>
                </v-badge>
              </v-slide-item>
            </v-slide-group>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-left pt-0" v-if="!changeImageFlow">
          <v-btn text @click="changeImageFlow=true" class="">
            <v-icon class="mr-2">edit</v-icon>
            {{ $t('offer:changeImage') }}
          </v-btn>
        </v-card-actions>
        <v-card-actions class="text-center pt-8">
          <v-btn color="primary" @click="addOffer" :loading="submitLoading" :disabled="submitLoading">
            {{ $t('offer:addOffer') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <input type="file" name="images" ref="uploadOfferImage"
             @change="filesChange($event.target.name, $event.target.files)"
             style="display: none;"/>
    </v-col>
  </v-row>
</template>
<script>
import I18n from "@/i18n";
import Images from '@/Images'
import OfferService from "@/service/OfferService";

const STATUS_INITIAL_UPLOAD = 0
const STATUS_SAVING_UPLOAD = 1
const STATUS_SUCCESS_UPLOAD = 2
const STATUS_FAILED_UPLOAD = 3
export default {
  components: {},
  async mounted() {
    this.descriptionId = Math.random();
    if (!this.offer.id) {
      this.changeImageFlow = true;
    }
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
      addOffer: "Ajouter votre offre"
    });
    I18n.i18next.addResources("en", "offer", {
      title: "Nouvelle offre",
      imageLabel: "Image optionelle pour votre offre. Vous pouvez être créatif",
      description: "Votre offre",
      uploadImage: "Téléverser une image",
      modify: "Modifier",
      upload: "Téléverser",
      changeImage: "Changer l'image",
      addOffer: "Ajouter votre offre"
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
        UserId: this.$store.state.user.id
      },
      isNewOffer: false,
      imageCarousel: 0,
      descriptionId: Math.random(),
      selectedImage: null,
      editorOptions: {},
      editorToolbar: [["bold", "italic", "underline", "link", {'color': []}, {'background': []}]],
      formatting: [],
      images: images,
      OfferService: OfferService,
      changeImageFlow: false,
      currentUploadStatus: STATUS_INITIAL_UPLOAD,
      submitLoading: false
    }
  },
  methods: {
    addOffer: async function () {
      this.submitLoading = true;
      await OfferService.create(this.offer);
      this.submitLoading = false;
      await this.$router.push("/offres");
    },
    getImageUrl() {
      if (this.offer.image) {
        return require('@/assets/categories/' + this.offer.image.file);
      } else if (this.offer.customImage) {
        return OfferService.getImageUrl(this.offer);
      } else {
        return "";
      }
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
      const image = await OfferService.uploadImage(formData).catch((err) => {
        this.uploadError = err.response
        this.currentStcurrentUploadStatusatus = STATUS_FAILED_UPLOAD
      });
      setTimeout(() => {
        this.$set(this.offer, 'customImage', image.data)
        this.currentUploadStatus = STATUS_SUCCESS_UPLOAD
      }, 1000);
    }
  },
  computed: {
    hasImage() {
      return this.offer.image || this.offer.imageCustom;
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
.ql-editor {
  color: black;
}
</style>
