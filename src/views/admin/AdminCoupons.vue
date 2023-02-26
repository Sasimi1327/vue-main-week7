<template>
  <div class="container">
    <LoadingView v-model:active="isLoading"></LoadingView>
    <div class="text-end mt-4">
      <button type="button"
      class="btn btn-primary"
      @click="openModal('')">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td>{{ $filters.date(coupon.due_date) }}</td>
          <td>
            <span v-if="coupon.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button"
              @click="openModal(coupon)"
              class="btn btn-outline-primary btn-sm">
                編輯
              </button>
              <button type="button"
              @click="openDelModal(coupon)"
              class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationView :pages="pagination" @emit-page="getCoupons"></PaginationView>
  </div>
  <CouponModal
    ref="couponModal"
    :is-new="isNew"
    :coupon="selectCoupon"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DeleteModal
    ref="delModal"
    :item="selectCoupon"
    @del-item="deleteCoupon"
  ></DeleteModal>
</template>

<script>
import CouponModal from '../../components/CouponModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import PaginationView from '../../components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      selectCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      currentPage: 1,
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupons?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.isLoading = false
          this.coupons = res.data.coupons
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
    updateCoupon (selectCoupon) {
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      let data = { ...selectCoupon }
      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${this.selectCoupon.id}`
        httpMethod = 'put'
        data = this.selectCoupon
      }
      this.isLoading = true
      this.$http[httpMethod](url, { data })
        .then(res => {
          this.getCoupons(this.currentPage)
          this.selectCoupon.title = ''
          this.selectCoupon.code = ''
          this.selectCoupon.percent = 100
          this.selectCoupon.is_enabled = 0
          this.$refs.couponModal.modal.hide()
          this.isLoading = false
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
    deleteCoupon () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${this.selectCoupon.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then(res => {
          this.isLoading = false
          this.getCoupons(this.currentPage)
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
    },
    openModal (coupon) {
      if (coupon) { // 更新
        console.log('Update')
        this.isNew = false
        this.selectCoupon = { ...coupon }
      } else { // 新增
        this.isNew = true
        this.selectCoupon = {
          ...this.selectCoupon,
          due_date: new Date().getTime() / 1000
        }
      }
      this.$refs.couponModal.modal.show()
    },
    openDelModal (coupon) {
      this.selectCoupon = { ...coupon }
      this.$refs.delModal.modal.show()
    }
  },
  components: {
    DeleteModal,
    CouponModal,
    PaginationView
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
