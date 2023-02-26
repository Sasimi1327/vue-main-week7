<template>
  <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      ref="modal">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 id="couponModalLabel" class="modal-title">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="selectCoupon.title"
              placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="selectCoupon.code"
              placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="discount">折扣百分比</label>
            <input type="number"
                  class="form-control"
                  id="discount"
                  min="0"
                  max="100"
                  v-model.number="selectCoupon.percent"
                  placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="selectCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-coupon', selectCoupon)"> {{ isNew ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  props: ['isNew', 'coupon'],
  data () {
    return {
      selectCoupon: {},
      modal: '',
      due_date: ''
    }
  },
  watch: {
    coupon () {
      this.selectCoupon = this.coupon

      // ['2023-02-26', '14:32:28.551Z']
      const dateAndTime = new Date(this.selectCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime
    }
  },
  mounted () {
    this.selectCoupon = this.coupon
    this.modal = new Modal(
      document.querySelector('#couponModal'),
      {
        backdrop: 'static',
        keyboard: false
      }
    )
  }
}
</script>
