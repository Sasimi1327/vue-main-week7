<template>
  <div class="container">
    <LoadingView v-model:active="isLoading"></LoadingView>
    <div class="text-end mt-4">
      <button type="button"
      @click="openModal('')"
      class="btn btn-primary">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-center">{{ product.origin_price }}</td>
          <td class="text-center">{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button"
              @click="openModal(product)"
              class="btn btn-outline-primary btn-sm">
                編輯
              </button>
              <button type="button"
              @click="openDelModal(product)"
              class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationView :pages="pagination" @emit-page="getProducts"></PaginationView>
  </div>
  <!-- Modal -->
  <ProductModal
    ref="productModal"
    :is-new="isNew"
    :product="selectProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DeleteModal
    ref="delModal"
    :item="selectProduct"
    @del-item="deleteProduct"
  ></DeleteModal>
</template>

<script>
import ProductModal from '../../components/ProductModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import PaginationView from '../../components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      selectProduct: {},
      isNew: false,
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DeleteModal,
    PaginationView
  },
  methods: {
    getProducts (page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          console.log('商品列表', res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: 'OK'
          })
        })
    },
    updateProduct (item) {
      this.selectProduct = item
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      this.isLoading = true
      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.selectProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](url, { data: this.selectProduct })
        .then(res => {
          this.isLoading = false
          this.getProducts(this.currentPage)
          this.$refs.productModal.modal.hide()
          if (!this.isNew) {
            Swal.fire({
              icon: 'success',
              title: res.data.message,
              confirmButtonText: 'OK'
            })
          }
        })
        .catch(err => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: 'OK'
          })
        })
    },
    deleteProduct () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.selectProduct.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then(res => {
          this.isLoading = false
          this.$refs.delModal.modal.hide()
          this.getProducts(this.currentPage)
        })
        .catch(err => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: 'OK'
          })
        })
    },
    openModal (product) {
      if (product) {
        this.isNew = false
        this.selectProduct = { ...product }
      } else {
        this.isNew = true
        this.selectProduct = {}
      }
      this.$refs.productModal.modal.show()
    },
    openDelModal (product) {
      this.selectProduct = { ...product }
      this.$refs.delModal.modal.show()
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
