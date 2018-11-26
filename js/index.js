
$(function () {
  var app = new Vue({
    el: '#app',
    data: {
      uploadshow: false,
      showadd: true,
      showbigimg: false,
      loadsrc: String,
      readyload: null,
      user: {
        userid: "",
        username: ''
      },
      toggle: true,
      filename: String,
      originData: Array,
      bigImg: Object,
      once: true,
      textload: '',
      showcell: false,
      input: {
        username: '',
        userage: '',
        useradd: '',
        activeclass: '',
        activename: '',
        bgm: '',
        id:''
      },
      isedit: false,
      inputAble: false,
      submitForm: true,
      list: Array,
      shownotic:false,
      showanpai:false,
      showphoto:false,
      showwrap:true,
      filterItem2:Array,
      count:0,
      allLoaded:false,
      screenw:document.body.clientWidth,
      p1:"第一名:",
      p2:"小招喵存钱罐 一个",
      bottomDistance:140,
      xingcheng:String,
      tip:String,
      mts:Array,
      canup:true,
      showremove:false,
    },
    mounted: function () {
      var vm = this
      this.getuser()
      this.loadRegistration()
      this.input.username = this.user.username
      this.getpic(1, 1000)
      // this.coord()
      // this.cor()
      var app = document.getElementById('app')
      var startload = document.getElementsByClassName('startload')[0]
      app.style.display = "block"
      startload.style.display = "none"
    },
    watch: {
    
    },
    computed: {
      filterItem: function () {
        var arr = []
        for (let i = 0; i < 4&&i < this.originData.length; i++) {
          arr.push(this.originData[i])
        }
        return arr
      },
      img5:function () {
        return this.originData[4]
      }
    },
    methods: {
      removepic:function (img) {
        var vm = this
        vm.$messagebox({
          title: '提示',
          confirmButtonText:"删除",
          message: '确定删除?删除后点赞数将清零',
          showCancelButton: true
        }).then(function (action) {
          if(action=='confirm'){
            $.ajax({
              url: "/api/image",
              type: 'Get',
              data: {
                isGetDeleteImg: true,
                id: img.id,
              },
              success: function (result) {
                if (result.StateCode == 1) {
                  vm.$toast({
                    message: '删除成功',
                    duration: 2000,
                    position: 'middle',
                    className: 'mytoa'
                  });
                  for(var k=0;k<vm.originData.length;k++){
                    if(vm.originData[k].id == img.id){
                      vm.originData.splice(k,1)
                    }
                  }
                  vm.showbigimg = false
                  var load = document.getElementsByClassName('mint-loadmore-content')[0]
                  document.body.classList.remove('styleee')
                  load.classList.remove('filt')
                }
                
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("err")
              },
              cache: false,
              dataType: 'json'
            });
          }
        })
        
      },
      deletpic:function (action) {
        
          if(action=='confirm'){
            $.ajax({
              url: "/api/image",
              type: 'Get',
              data:{
                isGetDeleteImg:true,
                id:img.id
              },
              success: function (result) {
                console.log(result);
                vm.$toast({
                  message: '删除成功',
                  duration: 2000,
                  position: 'middle',
                  className: 'mytoa'
                });
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("err")
              },
              cache: false,
              dataType: 'json'
            });
      
          }
      },
      getuser:function () {
        var vm=this
        var link = "http://163.53.94.155/www/photoshow/photoshow.html?data=" + 'dataString' + "&token=tokenString&userInfo=" + encodeURI(JSON.stringify({ name: 'userName', ystID: 198707 }));
        var linkStr = "http://163.53.94.155/www/photoshow/photoshow.html?data=dataString&token=tokenString&userInfo=%7B%22name%22:%22userName%22,%22ystID%22:198707%7D";
        linkStr=window.location.href
        var queryObj={}
        var str=linkStr.split("?")[1],
            items=str.split("&");
          var arr,name,value;
          for(var i = 0, l = items.length; i < l; i++){
            arr=items[i].split("=");
            name= arr[0];
            value= arr[1];
            queryObj[name]=value;
          }
        var user = JSON.parse(decodeURI((queryObj.userInfo)))
        vm.user.userid= user.ystID
        vm.user.username = user.name
      },
      handleChange:function(index) {
        if(index==0){
          this.p1="第一名:"
          this.p2="小招喵存钱罐 一个"
        } else if(index==1){
          this.p1 = "第二名："
          this.p2 = "IKEA 45件套带轨道玩具火车 一份"
        }else if(index==2){
          this.p1 = "第三名："
          this.p2 = "儿童架子鼓玩具 一套"
        }
      },
      loadTop:function () {
        this.getpic(1, 1000)
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom:function () {
        var vm =this
        this.bottomDistance = 140
        this.count +=1
        var num = vm.count
        var arr1 = []
        for (let i = 5*num;  i < 5*(num+1) &&i < vm.originData.length; i++) {
            arr1.push(vm.originData[i])
        }
        if(this.count==1){
            vm.filterItem2 = arr1
        }else{
            vm.filterItem2 = vm.filterItem2.concat(arr1)
        }
        if(this.count >=Math.ceil(vm.originData.length-4/10)){
          vm.$toast({
            message: '图片已全部加载完毕',
            duration: 1500,
            position: 'middle',
            className: 'mytoa'
          });
          vm.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      cor:function () {
        var vm =this
        window.onresize = function () {
          vm.coord()
        }
      },
      coord:function () {
        var img = document.getElementsByClassName('masterimg')[0]
        var imgw = img.width
        var nowwidth = imgw / 375
        var coords1="70,405,280,450"
        var coords2="70,453,180,495"
        var coords3="70,500,180,530"
        var coords4="70,536,280,575"
        var cor1 = document.getElementById('cors1')
        var cor2 = document.getElementById('cors2')
        var cor3 = document.getElementById('cors3')
        var cor4 = document.getElementById('cors4')
        console.log(this.cormethod(coords1, nowwidth));
        cor1.coords = coords1
        cor2.coords = coords2
        cor1.coords = this.cormethod(coords1, nowwidth).toString()
        cor2.coords = this.cormethod(coords2, nowwidth).toString()
        cor3.coords = this.cormethod(coords3, nowwidth).toString()
        cor4.coords = this.cormethod(coords4, nowwidth).toString()
      },
      cormethod:function (r,nowwidth) {
        var arr = []
        arr = r.split(",")
        for(let j = 0;j<arr.length;j++ ){
          if(Number(arr[j]>=0)){
            arr[j] = Math.round(arr[j]*nowwidth)
          }
        }
        return arr
      },
      showtips:function () {
        this.tip = "./imgs/xingcheng.jpg"
        this.shownotic = true
        // document.body.classList += 'styleee'
      },
      closetic:function () {
        this.shownotic = false
        // document.body.classList.remove('styleee')
      },
      showdetail:function () {
        this.xingcheng = "./imgs/anpai.jpg"
        this.showanpai = true
        document.body.classList.add('styleee')
      },
      closedetail:function () {
        this.showanpai = false
        document.body.classList.remove('styleee')
      },
      showtable:function () {
        this.showcell = true
        document.body.classList.add('styleee')
      },
       closetable:function () {
         this.showcell = false
         document.body.classList.remove('styleee')
       },
      showpic:function () {
       this.showphoto = true
        this.mts = ["./imgs/one.jpg","./imgs/two.jpg","./imgs/three.jpg"]
        if(this.showphoto){
          document.body.classList.add('styleee')
        } else {
          document.body.classList.remove('styleee')
        }
      },
      showhelp:function () {
        var vm =this
        this.showwrap = true
        // var show = document.getElementsByClassName('first_wrap')[0]
        // show.classList.remove('move')
        // show.addEventListener("transitionend",function () {
        //   vm.showwrap = true
        // })
      },
      togglehelp:function (e){
        var vm = this
        var show = document.getElementsByClassName('first_wrap')[0]
        show.classList.add('move')
        show.addEventListener("transitionend",function () {
          vm.showwrap = false
        })
      },
      loadRegistration: function () {
        var vm = this
        $.ajax({
          url: "/api/registration",
          type: 'Get',
          success: function (result) {
            if (result.StateCode == 1) {
              vm.list = result.Data
              console.log(result.Data);
              for (var i = 0; i < vm.list.length; i++) {
                if (vm.user.username == vm.list[i].parentname) {
                  //此时为编辑按钮阶段
                  vm.submitForm = false
                  vm.inputAble = true
                  vm.input.username = vm.list[i].parentname
                  vm.input.userage = vm.list[i].childage
                  vm.input.useradd =vm.list[i].childname
                  vm.input.bgm = vm.list[i].bgmname
                  vm.input.activename = vm.list[i].performname
                  vm.input.activeclass = vm.list[i].performance
                  vm.input.id = vm.list[i].id
                }
              }
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      registration: function () {
        var vm = this
        if (!vm.input.username || !vm.input.userage || !vm.input.useradd || !vm.input.activeclass || !vm.input.activename || !vm.input.bgm) {
          vm.$toast({
            message: '请将表格填写完整',
            duration: 1500,
            position: 'middle',
            className: 'mytoa'
          });
          return
        }
        var registrationItem
        if (this.submitForm) {
          registrationItem = {
            //新增报名，不需要添加id字段
            childname: this.input.useradd,
            childage: this.input.userage,
            parentname: this.input.username,
            performance: this.input.activeclass,
            performname: this.input.activename,
            bgmname: this.input.bgm
          }
        } else {
          registrationItem = {
            id: this.input.id, //修改报名，则需要添加id字段
            childname: this.input.useradd,
            childage: this.input.userage,
            parentname: this.input.username,
            performance: this.input.activeclass,
            performname: this.input.activename,
            bgmname: this.input.bgm
          }
        }
        $.ajax({
          url: "/api/registration",
          type: 'Post',
          data: registrationItem,
          success: function (result) {
            console.log(result);
            if (result.StateCode == 1) {
              if(vm.submitForm){
                vm.submitForm = false
                vm.inputAble = true
                vm.input.username = result.Data.parentname
                vm.input.userage = result.Data.childage
                vm.input.useradd = result.Data.childname
                vm.input.bgm = result.Data.bgmname
                vm.input.activename = result.Data.performname
                vm.input.activeclass = result.Data.performance
                vm.input.id = result.Data.id
                vm.$toast({
                  message: '报名成功',
                  duration: 1500,
                  position: 'middle',
                  className: 'mytoa'
                });
                vm.list.unshift(result.Data)
              }else{
                vm.submitForm = false
                vm.inputAble = true
                vm.input.username = result.Data.parentname
                vm.input.userage = result.Data.childage
                vm.input.useradd = result.Data.childname
                vm.input.bgm = result.Data.bgmname
                vm.input.activename = result.Data.performname
                vm.input.activeclass = result.Data.performance
                vm.$toast({
                  message: '保存成功',
                  duration: 1500,
                  position: 'middle',
                  className: 'mytoa'
                });
              }
              for(var j=0;j<vm.list.length;j++){
                if(vm.list[j].id==result.Data.id){
                  vm.$set(vm.list,j,result.Data)
                }
              }
             
            }
            
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      
      editInput: function (e) {
        var vm = this
        if (e.target.innerHTML == '编辑') {
          var inputs = document.getElementsByClassName('input_content')[0]
          inputs.classList.remove('if_edit')
          e.target.innerHTML = '保存'
          vm.submitForm = false
          vm.isedit = true
          vm.inputAble = false
        } else if (e.target.innerHTML == '保存') {
          e.target.innerHTML = '编辑'
          var inputs = document.getElementsByClassName('input_content')[0]
          inputs.classList.add('if_edit')
          vm.submitForm = false
          vm.isedit = false
          vm.inputAble = true
          vm.registration()
        }
      },
      loadimg: function (e) {
        if (e.currentTarget.width >= e.currentTarget.height) {
          e.currentTarget.classList.add('first_view')
        } else {
          e.currentTarget.classList.add('heightmax')
        }
      },
      getpic: function (pageNum, count) {
        var vm = this
        $.ajax({
          url: "/api/image",
          type: 'Get',
          data: {
            isGetImgList: true,
            userId: vm.user.userid,
            pageNum: pageNum,
            count: count
          },
          success: function (result) {
            console.log(result);
            if (result.StateCode == 1) {
              vm.originData = result.Data.img
              console.log(vm.originData);
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      spanll: function (e) {
        var inputnode = e.target.parentNode.children;
        inputnode[1].classList.add('light')
      },
      spanl: function (e) {
        var inputnode = e.target.parentNode.children;
        inputnode[1].classList.remove('light')
      },
      //点赞操作
      addzan: function (item) {
        var vm = this
        if(item.liked){
          return
        }
        if (!item.liked) {
          item.liked = true
          item.likecount = parseInt(item.likecount) + 1
        }
        var record = {
          //图片id
          fkid: item.id,
          userid: this.user.userid,
          valid: item.valid
        }
        $.ajax({
          url: "/api/record",
          type: 'Post',
          data: record,
          success: function (result) {
            if (result.StateCode == 1) {
              console.log(result);
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
            vm.$toast({
              message: '请求超时',
              duration: 1500,
              position: 'middle',
              className: 'mytoa'
            });
          },
          cache: false,
          dataType: 'json'
        });
        
      },
      //查看大图时对文字的显示与隐藏
      toggleshow: function () {
        this.toggle = !this.toggle
      },
      //上传图片
      uploadimg: function () {
        var vm = this
        if (!this.readyload) {
          this.$toast({
            message: '请添加图片',
            duration: 1500,
            position: 'bottom',
            className: 'mytoa'
          });
          return
        }
        this.$toast({
          message: '正在上传,请稍等',
          duration: 3000,
          position: 'bottom',
          className: 'mytoa'
        });
        
        var img = new Image()
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        img.src = this.loadsrc
        // base64地址图片加载完毕后 图片原始尺寸
        var originWidth = img.width;
        var originHeight = img.height;
        // 最大尺寸限制
        var maxWidth = 3000, maxHeight = 3000;
        // 目标尺寸
        var targetWidth = originWidth, targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        canvas.toBlob(function (blob) {
          var formData = new FormData()
          formData.append("description", vm.textload)
          formData.append("userid", vm.user.userid)
          formData.append("username", vm.user.username)
          formData.append("image", blob, vm.filename)
          
          $.ajax({
            url: "/api/image",
            type: 'Post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
              if (result.StateCode == 1) {
                vm.$toast({
                  message: '上传成功',
                  duration: 3000,
                  position: 'bottom',
                  className: 'mytoa'
                });
                vm.originData.unshift(result.Data)
                var arr = []
                for (let i = 0; i < 4&&i < vm.originData.length; i++) {
                      arr.push(vm.originData[i])
                }
                vm.filterItem = arr
                vm.img5 = vm.originData[4]
                vm.uploadshow = false
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              vm.$toast({
                message: '上传失败',
                duration: 3000,
                position: 'bottom',
                className: 'mytoa'
              });
            },
            cache: false,
            dataType: 'json'
          });
        })
        
      },
      upload: function () {
        var vm = this
        for(var k=0;k<vm.originData.length;k++){
          if(vm.user.userid ==vm.originData[k].userid){
            this.$toast({
              message: '只能上传一张照片，重新上传需先删除已有照片',
              duration: 3000,
              position: 'middle',
              className: 'mytoa'
            });
            return
          }
        }
        this.uploadshow = !this.uploadshow
        if (this.uploadshow) {
          document.body.classList += 'styleee'
        } else {
          document.body.classList.remove('styleee')
        }
      },
      addbutton: function (e) {
        var vm = this
        var file = e.target.files[0];
        var type = file.type.split('/')[0];
        if (type != 'image') {
          this.$toast({
            message: '请上传图片类型',
            duration: 3000,
            position: 'bottom',
            className: 'mytoa'
          });
          return;
        }
        
        var size = (file.size / 1024 / 1024).toFixed(2);
        if (size > 6) {
          this.$toast({
            message: '图片体积大小不能大于6m',
            duration: 3000,
            position: 'bottom',
            className: 'mytoa'
          });
          return;
        }
        this.filename = file.name
        this.showadd = !this.showadd
        this.readyload = null
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          vm.loadsrc = reader.result;
          vm.readyload = file
          //file里面存放有文件的名字(name)、格式(type)、大小(size)、上传时间(time)等等
        }
      },
      showbig: function (item) {
        var vm = this
        if(item.userid==vm.user.userid){
            vm.showremove = true
        }else{
          vm.showremove = false
        }
        this.showbigimg = !this.showbigimg
        var load = document.getElementsByClassName('mint-loadmore-content')[0]
        if (this.showbigimg) {
          document.body.classList += 'styleee'
          load.classList.add('filt')
          vm.$nextTick(function () {
            vm.touchevent()
          })
        } else {
          document.body.classList.remove('styleee')
          load.classList.remove('filt')
        }
        vm.bigImg = item
      },
      touchevent: function () {
        var vm = this
        $('.bigshow').on('touchstart', function (e) {
          var index = vm.originData.indexOf(vm.bigImg)
          //touchstart事件
          var $tb = $(this);
          var startX = e.touches[0].clientX,//手指触碰屏幕的x坐标
            pullDeltaX = 0;
          $tb.on('touchmove', function (e) {
            
            //touchmove事件
            var x = e.touches[0].clientX;//手指移动后所在的坐标
            pullDeltaX = x - startX;//移动后的位移
            if (!pullDeltaX) {
              return;
            }
            e.preventDefault();//阻止手机浏览器默认事件
          });
          $tb.on('touchend', function (e) {
            $tb.off('touchmove touchend');//解除touchmove和touchend事件
            e.stopPropagation();
            //判断移动距离是否大于30像素
            if (pullDeltaX > 30) {
              //右滑，往前翻所执行的代码
              if (index > 0 && vm.originData[index - 1].imageorigin) {
                vm.bigImg = vm.originData[index - 1]
              }
            }
            else if (pullDeltaX < -30) {
              if (index <= vm.originData.length - 1 && vm.originData[index + 1].imageorigin) {
                vm.bigImg = vm.originData[index + 1]
              }
              //左滑，往后翻所执行的代码
            }
          });
        });
      }
    }
  })
  
})