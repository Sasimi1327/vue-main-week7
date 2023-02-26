import{M,D as L,P as T}from"./PaginationView-f64d28d6.js";import{_ as w,o as n,c,a as t,w as u,v as m,h as A,g as U,F as y,j as x,k as E,r as _,b as f,t as b}from"./index-ec405a60.js";import{S as P}from"./sweetalert2.all-2301b2d1.js";const{VITE_APP_URL:D,VITE_APP_PATH:C}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"sasimi",BASE_URL:"/vue-main-week7/",MODE:"production",DEV:!1,PROD:!0},I={props:["isNew","product"],data(){return{status:{},modal:"",selectProduct:{}}},watch:{product(){this.selectProduct=this.product,this.selectProduct.imagesUrl||(this.selectProduct.imagesUrl=[]),this.selectProduct.imageUrl||(this.selectProduct.imageUrl="")}},methods:{uploadFile(){const l=this.$refs.fileInput.files[0],e=new FormData;e.append("file-to-upload",l);const i=`${D}/api/${C}/admin/upload`;this.status.fileUploading=!0,this.$http.post(i,e,{headers:{"Content-Type":"multipart/form-data"}}).then(d=>{this.status.fileUploading=!1,d.data.success&&(this.selectProduct.imageUrl=d.data.imageUrl,this.$refs.fileInput.value="")}).catch(d=>{this.status.fileUploading=!1,console.log(d)})},updateProduct(){this.$emit("update-product",this.selectProduct)}},mounted(){this.modal=new M(document.querySelector("#productModal"),{backdrop:"static",keyboard:!1})}},N={id:"productModal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true",ref:"modal"},B={class:"modal-dialog modal-xl"},F={class:"modal-content border-0"},R={class:"modal-header bg-dark text-white"},$={id:"productModalLabel",class:"modal-title"},O={key:0},S={key:1},H=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),K={class:"modal-body"},j={class:"row"},q={class:"col-sm-4"},z={class:"mb-3"},G=t("label",{for:"image",class:"form-label"},"輸入圖片網址",-1),J={class:"mb-3"},Q={for:"customFile",class:"form-label"},W={key:0,class:"fas fa-spinner fa-spin"},X=["src"],Y={key:0,class:"mt-5"},Z={class:"mb-3"},tt=t("label",{for:"imgUrl",class:"form-label"},"圖片網址",-1),et=["onUpdate:modelValue"],st=["src"],ot=["onClick"],lt={key:0},it={class:"col-sm-8"},nt={class:"mb-3"},ct=t("label",{for:"title",class:"form-label"},"標題",-1),dt={class:"row"},rt={class:"mb-3 col-md-6"},at=t("label",{for:"category",class:"form-label"},"分類",-1),ut={class:"mb-3 col-md-6"},mt=t("label",{for:"price",class:"form-label"},"單位",-1),pt={class:"row"},ht={class:"mb-3 col-md-6"},_t=t("label",{for:"origin_price",class:"form-label"},"原價",-1),ft={class:"mb-3 col-md-6"},bt=t("label",{for:"price",class:"form-label"},"售價",-1),Pt=t("hr",null,null,-1),gt={class:"mb-3"},vt=t("label",{for:"description",class:"form-label"},"產品描述",-1),Ut={class:"mb-3"},yt=t("label",{for:"content",class:"form-label"},"說明內容",-1),wt={class:"mb-3"},xt={class:"form-check"},Vt=t("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),kt={class:"modal-footer"},Mt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Lt(l,e,i,d,s,r){return n(),c("div",N,[t("div",B,[t("div",F,[t("div",R,[t("h5",$,[i.isNew?(n(),c("span",O,"新增產品")):(n(),c("span",S,"編輯產品"))]),H]),t("div",K,[t("div",j,[t("div",q,[t("div",z,[G,u(t("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":e[0]||(e[0]=o=>s.selectProduct.imageUrl=o),placeholder:"請輸入圖片連結"},null,512),[[m,s.selectProduct.imageUrl]])]),t("div",J,[t("label",Q,[A("或 上傳圖片 "),s.status.fileUploading?(n(),c("i",W)):U("",!0)]),t("input",{type:"file",id:"customFile",class:"form-control",ref:"fileInput",onChange:e[1]||(e[1]=(...o)=>r.uploadFile&&r.uploadFile(...o))},null,544)]),t("img",{class:"img-fluid",src:s.selectProduct.imageUrl},null,8,X),Array.isArray(s.selectProduct.imagesUrl)?(n(),c("div",Y,[(n(!0),c(y,null,x(s.selectProduct.imagesUrl,(o,p)=>(n(),c("div",{class:"mb-3",key:p},[t("div",Z,[tt,u(t("input",{type:"url",class:"form-control mb-2",placeholder:"請輸入圖片連結","onUpdate:modelValue":h=>s.selectProduct.imagesUrl[p]=h},null,8,et),[[m,s.selectProduct.imagesUrl[p]]])]),t("img",{class:"img-fluid",src:o},null,8,st),t("button",{class:"btn btn-outline-danger btn-sm d-block w-100",onClick:h=>s.selectProduct.imagesUrl.splice(p,1)}," 刪除圖片 ",8,ot)]))),128)),!s.selectProduct.imagesUrl.length||s.selectProduct.imagesUrl.at(-1)?(n(),c("div",lt,[t("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[2]||(e[2]=o=>s.selectProduct.imagesUrl.push(""))}," 新增圖片 ")])):U("",!0)])):U("",!0)]),t("div",it,[t("div",nt,[ct,u(t("input",{id:"title",type:"text",class:"form-control","onUpdate:modelValue":e[3]||(e[3]=o=>s.selectProduct.title=o),placeholder:"請輸入標題"},null,512),[[m,s.selectProduct.title]])]),t("div",dt,[t("div",rt,[at,u(t("input",{id:"category",type:"text",class:"form-control","onUpdate:modelValue":e[4]||(e[4]=o=>s.selectProduct.category=o),placeholder:"請輸入分類"},null,512),[[m,s.selectProduct.category]])]),t("div",ut,[mt,u(t("input",{type:"text",class:"form-control",id:"unit","onUpdate:modelValue":e[5]||(e[5]=o=>s.selectProduct.unit=o),placeholder:"請輸入單位"},null,512),[[m,s.selectProduct.unit]])])]),t("div",pt,[t("div",ht,[_t,u(t("input",{type:"number",class:"form-control",id:"origin_price",min:"0","onUpdate:modelValue":e[6]||(e[6]=o=>s.selectProduct.origin_price=o),placeholder:"請輸入原價"},null,512),[[m,s.selectProduct.origin_price,void 0,{number:!0}]])]),t("div",ft,[bt,u(t("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":e[7]||(e[7]=o=>s.selectProduct.price=o),min:"0",placeholder:"請輸入售價"},null,512),[[m,s.selectProduct.price,void 0,{number:!0}]])])]),Pt,t("div",gt,[vt,u(t("textarea",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":e[8]||(e[8]=o=>s.selectProduct.description=o),placeholder:"請輸入產品描述"},null,512),[[m,s.selectProduct.description]])]),t("div",Ut,[yt,u(t("textarea",{type:"text",class:"form-control",id:"content","onUpdate:modelValue":e[9]||(e[9]=o=>s.selectProduct.content=o),placeholder:"請輸入說明內容"},null,512),[[m,s.selectProduct.content]])]),t("div",wt,[t("div",xt,[u(t("input",{class:"form-check-input",type:"checkbox",id:"is_enabled","onUpdate:modelValue":e[10]||(e[10]=o=>s.selectProduct.is_enabled=o),"true-value":1,"false-value":0},null,512),[[E,s.selectProduct.is_enabled]]),Vt])])])])]),t("div",kt,[Mt,t("button",{type:"button",class:"btn btn-primary",onClick:e[11]||(e[11]=(...o)=>r.updateProduct&&r.updateProduct(...o))}," 確認 ")])])])],512)}const Tt=w(I,[["render",Lt]]),{VITE_APP_URL:g,VITE_APP_PATH:v}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"sasimi",BASE_URL:"/vue-main-week7/",MODE:"production",DEV:!1,PROD:!0},At={data(){return{products:[],selectProduct:{},isNew:!1,pagination:{},currentPage:1,isLoading:!1}},components:{ProductModal:Tt,DeleteModal:L,PaginationView:T},methods:{getProducts(l=1){const e=`${g}/api/${v}/admin/products?page=${l}`;this.isLoading=!0,this.$http.get(e).then(i=>{console.log("商品列表",i.data),this.products=i.data.products,this.pagination=i.data.pagination,this.isLoading=!1}).catch(i=>{this.isLoading=!1,P.fire({icon:"error",title:`錯誤 ${i.response.status}`,text:i.response.data.message,confirmButtonText:"OK"})})},updateProduct(l){this.selectProduct=l;let e=`${g}/api/${v}/admin/product`,i="post";this.isLoading=!0,this.isNew||(e=`${g}/api/${v}/admin/product/${this.selectProduct.id}`,i="put"),this.$http[i](e,{data:this.selectProduct}).then(d=>{this.isLoading=!1,this.getProducts(this.currentPage),this.$refs.productModal.modal.hide(),this.isNew||P.fire({icon:"success",title:d.data.message,confirmButtonText:"OK"})}).catch(d=>{this.isLoading=!1,P.fire({icon:"error",title:`錯誤 ${d.response.status}`,text:d.response.data.message,confirmButtonText:"OK"})})},deleteProduct(){const l=`${g}/api/${v}/admin/product/${this.selectProduct.id}`;this.isLoading=!0,this.$http.delete(l).then(e=>{this.isLoading=!1,this.$refs.delModal.modal.hide(),this.getProducts(this.currentPage)}).catch(e=>{this.isLoading=!1,P.fire({icon:"error",title:`錯誤 ${e.response.status}`,text:e.response.data.message,confirmButtonText:"OK"})})},openModal(l){l?(this.isNew=!1,this.selectProduct={...l}):(this.isNew=!0,this.selectProduct={}),this.$refs.productModal.modal.show()},openDelModal(l){this.selectProduct={...l},this.$refs.delModal.modal.show()}},mounted(){this.getProducts()}},Et={class:"container"},Dt={class:"text-end mt-4"},Ct={class:"table mt-4"},It=t("thead",null,[t("tr",null,[t("th",{width:"120"}," 分類 "),t("th",null,"產品名稱"),t("th",{width:"120"}," 原價 "),t("th",{width:"120"}," 售價 "),t("th",{width:"100"}," 是否啟用 "),t("th",{width:"120"}," 編輯 ")])],-1),Nt={class:"text-center"},Bt={class:"text-center"},Ft={key:0,class:"text-success"},Rt={key:1},$t={class:"btn-group"},Ot=["onClick"],St=["onClick"];function Ht(l,e,i,d,s,r){const o=_("LoadingView"),p=_("PaginationView"),h=_("ProductModal"),V=_("DeleteModal");return n(),c(y,null,[t("div",Et,[f(o,{active:s.isLoading,"onUpdate:active":e[0]||(e[0]=a=>s.isLoading=a)},null,8,["active"]),t("div",Dt,[t("button",{type:"button",onClick:e[1]||(e[1]=a=>r.openModal("")),class:"btn btn-primary"}," 建立新的產品 ")]),t("table",Ct,[It,t("tbody",null,[(n(!0),c(y,null,x(s.products,a=>(n(),c("tr",{key:a.id},[t("td",null,b(a.category),1),t("td",null,b(a.title),1),t("td",Nt,b(a.origin_price),1),t("td",Bt,b(a.price),1),t("td",null,[a.is_enabled?(n(),c("span",Ft,"啟用")):(n(),c("span",Rt,"未啟用"))]),t("td",null,[t("div",$t,[t("button",{type:"button",onClick:k=>r.openModal(a),class:"btn btn-outline-primary btn-sm"}," 編輯 ",8,Ot),t("button",{type:"button",onClick:k=>r.openDelModal(a),class:"btn btn-outline-danger btn-sm"}," 刪除 ",8,St)])])]))),128))])]),f(p,{pages:s.pagination,onEmitPage:r.getProducts},null,8,["pages","onEmitPage"])]),f(h,{ref:"productModal","is-new":s.isNew,product:s.selectProduct,onUpdateProduct:r.updateProduct},null,8,["is-new","product","onUpdateProduct"]),f(V,{ref:"delModal",item:s.selectProduct,onDelItem:r.deleteProduct},null,8,["item","onDelItem"])],64)}const zt=w(At,[["render",Ht]]);export{zt as default};
