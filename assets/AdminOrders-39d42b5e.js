import{M as L,P as V,D as C}from"./PaginationView-a8574c3f.js";import{_ as k,o as s,c as o,a as t,t as l,h as y,F as p,j as O,w as v,k as P,r as m,d as f,n as D}from"./index-06678381.js";import{S as _}from"./sweetalert2.all-ac85c900.js";const T={props:["order"],data(){return{selectOrder:{},modal:"",isPaid:!1}},mounted(){this.modal=new L(document.querySelector("#orderModal"),{backdrop:"static",keyboard:!1})},watch:{order(){this.selectOrder=this.order}}},E={id:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true",ref:"modal"},S={class:"modal-dialog modal-xl"},B={class:"modal-content border-0"},U=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{id:"productModalLabel",class:"modal-title"},[t("span",null,"訂單明細")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),A={class:"modal-body"},I={class:"row"},K={class:"col-md-4"},R=t("h3",null,"用戶資料",-1),j={class:"table"},q={key:0},N=t("th",{style:{width:"40%"}},"姓名",-1),F=t("th",{style:{width:"40%"}},"電子郵件",-1),H=t("th",{style:{width:"40%"}},"電話",-1),z=t("th",{style:{width:"40%"}},"地址",-1),G={class:"col-md-8"},J=t("h3",null,"訂單明細",-1),Q={class:"table"},W=t("th",{style:{width:"100px"}},"訂單編號",-1),X=t("th",{style:{width:"100px"}},"下單時間",-1),Y=t("th",{style:{width:"100px"}},"付款時間",-1),Z={key:0},tt={key:1},et=t("th",null,"付款狀態",-1),st={key:0,class:"text-success"},ot={key:1,class:"text-muted"},lt=t("th",null,"總金額",-1),nt=t("h3",null,"選購商品",-1),dt={class:"table"},it={class:"text-end"},at={class:"d-flex justify-content-end"},rt={class:"form-check"},ct={class:"form-check-label",for:"isPaidCheck"},ut={key:0},ht={key:1},_t={class:"modal-body d-flex justify-content-end"},pt=t("button",{type:"button",class:"btn btn-outline-secondary me-2","data-bs-dismiss":"modal"}," 取消 ",-1);function mt(n,d,r,h,e,u){return s(),o("div",E,[t("div",S,[t("div",B,[U,t("div",A,[t("div",I,[t("div",K,[R,t("table",j,[e.selectOrder.user?(s(),o("tbody",q,[t("tr",null,[N,t("td",null,l(e.selectOrder.user.name),1)]),t("tr",null,[F,t("td",null,l(e.selectOrder.user.email),1)]),t("tr",null,[H,t("td",null,l(e.selectOrder.user.tel),1)]),t("tr",null,[z,t("td",null,l(e.selectOrder.user.address),1)])])):y("",!0)])]),t("div",G,[J,t("table",Q,[t("tbody",null,[t("tr",null,[W,t("td",null,l(e.selectOrder.id),1)]),t("tr",null,[X,t("td",null,l(n.$filters.date(e.selectOrder.create_at)),1)]),t("tr",null,[Y,t("td",null,[e.selectOrder.paid_date?(s(),o("span",Z,l(n.$filters.date(e.selectOrder.paid_date)),1)):(s(),o("span",tt,"時間不正確"))])]),t("tr",null,[et,t("td",null,[e.selectOrder.is_paid?(s(),o("span",st,"已付款")):(s(),o("span",ot,"未付款"))])]),t("tr",null,[lt,t("td",null,l(n.$filters.currency(e.selectOrder.total)),1)])])]),nt,t("table",dt,[t("tbody",null,[(s(!0),o(p,null,O(e.selectOrder.products,a=>(s(),o("tr",{key:a.id},[t("th",null,l(a.product.title),1),t("td",null,l(a.qty)+" / "+l(a.product.unit),1),t("td",it,l(a.total),1)]))),128))])]),t("div",at,[t("div",rt,[v(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"isPaidCheck","onUpdate:modelValue":d[0]||(d[0]=a=>e.selectOrder.is_paid=a)},null,512),[[P,e.selectOrder.is_paid]]),t("label",ct,[e.selectOrder.is_paid?(s(),o("span",ut,"已付款")):(s(),o("span",ht,"未付款"))])])])])])]),t("div",_t,[pt,t("button",{type:"button",class:"btn btn-primary",onClick:d[1]||(d[1]=a=>n.$emit("update-order",e.selectOrder))}," 確認 ")])])])],512)}const ft=k(T,[["render",mt]]),{VITE_APP_URL:b,VITE_APP_PATH:g}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"sasimi1327",BASE_URL:"/vue-main-week7/",MODE:"production",DEV:!1,PROD:!0},bt={data(){return{orders:[],pagination:{},selectOrder:{},currentPage:1,isLoading:!1}},methods:{getOrders(n=1){const d=`${b}/api/${g}/admin/orders?page=${n}`;this.isLoading=!0,this.$http.get(d).then(r=>{this.isLoading=!1,this.orders=r.data.orders,this.pagination=r.data.pagination}).catch(r=>{this.isLoading=!1,_.fire({icon:"error",title:`錯誤 ${r.response.status}`,text:r.response.data.message,confirmButtonText:"OK"})})},updatePaidStatus(n){const d=`${b}/api/${g}/admin/order/${n.id}`,r={is_paid:n.is_paid};this.isLoading=!0,this.$http.put(d,{data:r}).then(h=>{this.isLoading=!1,this.getOrders(this.currentPage),this.$refs.orderModal.modal.hide(),_.fire({icon:"success",title:h.data.message,confirmButtonText:"OK"})}).catch(h=>{this.isLoading=!1,_.fire({icon:"error",title:`錯誤 ${h.response.status}`,text:h.response.data.message,confirmButtonText:"OK"})})},openModal(n){this.selectOrder={...n},this.$refs.orderModal.modal.show()},openDelModal(n){this.selectOrder={...n},this.$refs.delModal.modal.show()},deleteOrder(){const n=`${b}/api/${g}/admin/order/${this.selectOrder.id}`;this.isLoading=!0,this.$http.delete(n).then(d=>{this.isLoading=!1,this.getOrders(this.currentPage),this.$refs.delModal.modal.hide(),_.fire({icon:"success",title:d.data.message,confirmButtonText:"OK"})}).catch(d=>{this.isLoading=!1,_.fire({icon:"error",title:`錯誤 ${d.response.status}`,text:d.response.data.message,confirmButtonText:"OK"})})}},components:{PaginationView:V,OrderModal:ft,DeleteModal:C},mounted(){this.getOrders()}},gt={class:"container"},yt={class:"table mt-4"},Ot=t("thead",null,[t("tr",null,[t("th",null,"購買時間"),t("th",null,"電子郵件"),t("th",null,"購買款項"),t("th",null,"應付金額"),t("th",null,"是否付款"),t("th",null,"編輯")])],-1),kt={key:0},vt={class:"list-unstyled"},Pt={class:"form-check form-switch"},wt=["onUpdate:modelValue","onChange"],Mt={class:"form-check-label",for:"`paidSwitch_${order.id}`"},$t={key:0},xt={key:1},Lt={class:"btn-group"},Vt=["onClick"],Ct=["onClick"];function Dt(n,d,r,h,e,u){const a=m("LoadingView"),w=m("PaginationView"),M=m("OrderModal"),$=m("DeleteModal");return s(),o(p,null,[t("div",gt,[f(a,{active:e.isLoading,"onUpdate:active":d[0]||(d[0]=i=>e.isLoading=i)},null,8,["active"]),t("table",yt,[Ot,t("tbody",null,[(s(!0),o(p,null,O(e.orders,i=>(s(),o(p,{key:i.id},[e.orders.length?(s(),o("tr",{key:0,class:D({"text-muted":i.is_paid})},[t("td",null,l(n.$filters.date(i.create_at)),1),t("td",null,[i.user?(s(),o("span",kt,l(i.user.email),1)):y("",!0)]),t("td",null,[t("ul",vt,[(s(!0),o(p,null,O(i.products,(c,x)=>(s(),o("li",{key:x},l(c.product.title)+" / "+l(c.qty)+l(c.product.unit),1))),128))])]),t("td",null,l(i.total),1),t("td",null,[t("div",Pt,[v(t("input",{class:"form-check-input",type:"checkbox",id:"`paidSwitch_${order.id}`","onUpdate:modelValue":c=>i.is_paid=c,onChange:c=>u.updatePaidStatus(i)},null,40,wt),[[P,i.is_paid]])]),t("label",Mt,[i.is_paid?(s(),o("span",$t,"已付款")):(s(),o("span",xt,"未付款"))])]),t("td",null,[t("div",Lt,[t("button",{type:"button",onClick:c=>u.openModal(i),class:"btn btn-outline-primary btn-sm"}," 檢視 ",8,Vt),t("button",{type:"button",onClick:c=>u.openDelModal(i),class:"btn btn-outline-danger btn-sm"}," 刪除 ",8,Ct)])])],2)):y("",!0)],64))),128))])]),f(w,{pages:e.pagination,onEmitPage:u.getOrders},null,8,["pages","onEmitPage"])]),f(M,{ref:"orderModal",order:e.selectOrder,onUpdateOrder:u.updatePaidStatus},null,8,["order","onUpdateOrder"]),f($,{ref:"delModal",item:e.selectOrder,onDelItem:u.deleteOrder},null,8,["item","onDelItem"])],64)}const Bt=k(bt,[["render",Dt]]);export{Bt as default};