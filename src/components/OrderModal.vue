<template>
  <div
      id="orderModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>訂單明細</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="selectOrder.user">
                  <tr>
                    <th style="width: 40%">姓名</th>
                    <td>{{ selectOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th style="width: 40%">電子郵件</th>
                    <td>{{ selectOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th style="width: 40%">電話</th>
                    <td>{{ selectOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th style="width: 40%">地址</th>
                    <td>{{ selectOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單明細</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ selectOrder.id }}</td>
                  </tr>
                  <tr>
                    <th style="width: 100px">下單時間</th>
                    <td>{{ $filters.date(selectOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th style="width: 100px">付款時間</th>
                    <td>
                      <span v-if="selectOrder.paid_date">
                        {{ $filters.date(selectOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="selectOrder.is_paid" class="text-success">已付款</span>
                      <span v-else class="text-muted">未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ $filters.currency(selectOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="product in selectOrder.products" :key="product.id">
                    <th>{{ product.product.title }}</th>
                    <td>
                      {{ product.qty }} / {{ product.product.unit }}
                    </td>
                    <td class="text-end">
                      {{ product.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="isPaidCheck"
                    v-model="selectOrder.is_paid"
                  />
                  <label class="form-check-label" for="isPaidCheck">
                    <span v-if="selectOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body d-flex justify-content-end">
          <button type="button"
                class="btn btn-outline-secondary me-2"
                data-bs-dismiss="modal">
            取消
          </button>
          <button type="button"
                class="btn btn-primary"
                @click="$emit('update-order', selectOrder)"
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

export default {
  props: ['order'],
  data () {
    return {
      selectOrder: {},
      modal: '',
      isPaid: false
    }
  },
  mounted () {
    this.modal = new Modal(
      document.querySelector('#orderModal'),
      {
        backdrop: 'static',
        keyboard: false
      }
    )
  },
  watch: {
    order () {
      this.selectOrder = this.order
    }
  }
}
</script>
