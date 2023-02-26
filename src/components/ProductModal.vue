<template>
  <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">

              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control"
                id="image"
                v-model="selectProduct.imageUrl"
                placeholder="請輸入圖片連結">
              </div>

              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.fileUploading"
                  ></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="selectProduct.imageUrl" />

              <div class="mt-5" v-if="Array.isArray(selectProduct.imagesUrl)">
                <div v-for="(imgUrl, key) in selectProduct.imagesUrl"
                    class="mb-3"
                    :key="key"
                >
                  <div class="mb-3">
                    <label for="imgUrl" class="form-label">圖片網址</label>
                    <input type="url"
                          class="form-control mb-2"
                          placeholder="請輸入圖片連結"
                          v-model="selectProduct.imagesUrl[key]
                        ">
                  </div>
                  <img class="img-fluid" :src="imgUrl">
                  <!-- 多圖 -->
                  <button class="btn btn-outline-danger btn-sm d-block w-100"
                          @click="selectProduct.imagesUrl.splice(key, 1)"
                  >
                    刪除圖片
                  </button>
                </div>

                <div
                  v-if="!selectProduct.imagesUrl.length || selectProduct.imagesUrl.at(-1)">
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100" @click="selectProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title"
                  type="text"
                  class="form-control"
                  v-model="selectProduct.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category"
                    type="text"
                    class="form-control"
                    v-model="selectProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="selectProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    min="0"
                    v-model.number="selectProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="selectProduct.price"
                    min="0"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="selectProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="selectProduct.content"
                  placeholder="請輸入說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="selectProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal">
            取消
          </button>
          <button type="button"
                class="btn btn-primary"
                @click="updateProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  props: ['isNew', 'product'],
  data () {
    return {
      status: {},
      modal: '',
      selectProduct: {}
    }
  },
  watch: {
    product () {
      this.selectProduct = this.product
      if (!this.selectProduct.imagesUrl) {
        this.selectProduct.imagesUrl = []
      }
      if (!this.selectProduct.imageUrl) {
        this.selectProduct.imageUrl = ''
      }
    }
  },
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`
      this.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          this.status.fileUploading = false
          if (res.data.success) {
            this.selectProduct.imageUrl = res.data.imageUrl
            this.$refs.fileInput.value = ''
          }
        })
        .catch(err => {
          this.status.fileUploading = false
          console.log(err)
        })
    },
    updateProduct () {
      this.$emit('update-product', this.selectProduct)
    }
  },
  mounted () {
    this.modal = new Modal(
      document.querySelector('#productModal'),
      {
        backdrop: 'static',
        keyboard: false
      }
    )
  }
}
</script>
