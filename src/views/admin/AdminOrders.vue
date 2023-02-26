<template>
  <div class="container">
    <LoadingView v-model:active="isLoading"></LoadingView>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>電子郵件</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="order in orders" :key="order.id">
          <tr v-if="orders.length" :class="{ 'text-muted': order.is_paid }">
            <td>{{ $filters.date(order.create_at) }}</td>
            <td><span v-if="order.user">{{ order.user.email }}</span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, key) in order.products" :key="key">
                  {{ product.product.title }} / {{ product.qty }}{{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ order.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox"
                id="`paidSwitch_${order.id}`"
                v-model="order.is_paid"
                @change="updatePaidStatus(order)">
              </div>
              <label class="form-check-label" for="`paidSwitch_${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </td>
            <td>
              <div class="btn-group">
              <button type="button"
              @click="openModal(order)"
              class="btn btn-outline-primary btn-sm">
                檢視
              </button>
              <button type="button"
              @click="openDelModal(order)"
              class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <PaginationView :pages="pagination" @emit-page="getOrders"></PaginationView>
  </div>
  <OrderModal
    ref="orderModal"
    :order="selectOrder"
    @update-order="updatePaidStatus"
  ></OrderModal>
  <DeleteModal
    ref="delModal"
    :item="selectOrder"
    @del-item="deleteOrder"
  ></DeleteModal>
</template>

<script>
import PaginationView from '../../components/PaginationView.vue'
import OrderModal from '../../components/OrderModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      orders: [],
      pagination: {},
      selectOrder: {},
      currentPage: 1,
      isLoading: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.isLoading = false
          console.log('訂單列表', res.data.orders)
          this.orders = res.data.orders
          this.pagination = res.data.pagination
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
    updatePaidStatus (order) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${order.id}`
      const paid = {
        is_paid: order.is_paid
      }
      this.isLoading = true
      this.$http.put(url, { data: paid })
        .then(res => {
          this.isLoading = false
          this.getOrders(this.currentPage)
          this.$refs.orderModal.modal.hide()
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            confirmButtonText: 'OK'
          })
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
    openModal (order) {
      console.log('檢視訂單')
      this.selectOrder = { ...order }
      this.$refs.orderModal.modal.show()
    },
    openDelModal (order) {
      console.log('刪除訂單', order)
      this.selectOrder = { ...order }
      this.$refs.delModal.modal.show()
    },
    deleteOrder () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.selectOrder.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then(res => {
          this.isLoading = false
          this.getOrders(this.currentPage)
          this.$refs.delModal.modal.hide()
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            confirmButtonText: 'OK'
          })
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
    }
  },
  components: {
    PaginationView,
    OrderModal,
    DeleteModal
  },
  mounted () {
    console.log('mounted', this)
    this.getOrders()
  }
}
</script>
