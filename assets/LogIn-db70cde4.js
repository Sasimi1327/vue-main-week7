import{S as c}from"./sweetalert2.all-fc3093af.js";import{_ as m,o as u,c as p,a as s,w as d,v as l}from"./index-1e29db99.js";const{VITE_APP_URL:_}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"sasimi",BASE_URL:"/vue-main-week7/",MODE:"production",DEV:!1,PROD:!0},f={data(){return{user:{username:"",password:""}}},methods:{signin(){const n=`${_}/admin/signin`;this.$http.post(n,this.user).then(e=>{const{token:r,expired:i}=e.data;document.cookie=`hexToken=${r}; expires=${new Date(i)};`,c.fire({icon:"success",title:"登入成功",confirmButtonText:"OK"}),this.$router.push("/admin/products")}).catch(e=>{c.fire({icon:"error",title:`錯誤 ${e.response.status}`,text:e.response.data.message,confirmButtonText:"OK"})})}}},h={class:"container mt-5"},w={class:"row justify-content-center"},x={class:"col-8"},g=s("h1",{class:"h2 mb-4 font-weight-normal"}," 請先登入 ",-1),v={id:"form",class:"form-signin"},b={class:"form-floating mb-3"},P=s("label",{for:"username"},"Email address",-1),E={class:"form-floating"},T=s("label",{for:"password"},"Password",-1),k=s("p",{class:"mt-5 mb-3 text-muted text-center"}," © 2023~∞ - 六角學院 ",-1);function V(n,e,r,i,o,a){return u(),p("div",h,[s("div",w,[s("div",x,[g,s("form",v,[s("div",b,[d(s("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":e[0]||(e[0]=t=>o.user.username=t),placeholder:"name@example.com",required:"",autofocus:""},null,512),[[l,o.user.username]]),P]),s("div",E,[d(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=t=>o.user.password=t),placeholder:"Password",required:""},null,512),[[l,o.user.password]]),T]),s("button",{class:"btn btn-lg btn-primary w-100 mt-3",onClick:e[2]||(e[2]=(...t)=>a.signin&&a.signin(...t)),type:"submit"}," 登入 ")])])]),k])}const A=m(f,[["render",V]]);export{A as default};
