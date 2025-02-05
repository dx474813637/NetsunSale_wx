const http = uni.$u.http

// all_api api=接口名称 其他参数保持一致
export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return http.get('all_api', data)
	} else if (methods == 'POST') {
		return http.post('all_api', data, config)
	}
}

// address 地址列表 参数p
export const address = (data) => http.get('address', data)
// address_detail 地址详情 参数id
export const address_detail = (data) => http.get('address_detail', data)
// address_save 地址新增/修改 参数 id修改时需要传 area地区编码 area_name地区 address详细地址 default=1默认 0不默认 name收货人 tel联系电话
export const address_save = (data) => http.get('address_save', data)
// address_del 删除地址 参数id
export const address_del = (data) => http.get('address_del', data)


// xcx_login
export const xcx_login = (data) => http.get('xcx_login', data)
// // syblogin
// export const syblogin = (data) => http.get('syblogin', data)
// // sign_out
// export const sign_out = (data) => http.get('sign_out', data)
// // msgcode
// export const msgcode = (data) => http.get('msgcode', data)
// // login_role
// export const login_role = (data) => http.get('login_role', data) 
// // my_card
// export const my_card = (data) => http.get('my_card', data)
// // edit_card
// export const edit_card = (data) => http.get('edit_card', data)


//  订阅模板 type=0默认订阅  1订单状态订阅
export const tmp_id_list = (data) => http.get('tmp_id_list', data) 
//  订阅成功后把返回的TEMPLATE_ID 已json格式  提交到str
export const tmp_id_back = (data) => http.get('tmp_id_back', data) 
// wx.getSetting把始终订阅的数据 json格式 提交到str
export const get_tmp_id_time = (data) => http.get('get_tmp_id_time', data) 
  
// my_ewm 二维码
export const myEwm = (data) => http.get('my_ewm', data)

// order_type 订单状态type 
export const order_type = (data) => http.get('order_type', data) 
// `create_order` 生成订单 参数pid_array  address_id
// json格式，每一条记录包含： cid表示旺铺ID，pid商品ID，num表示购买的商品数量
// export const create_order = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'create_order'}}))
// `order_list` 订单列表  参数type 1待付款 2待收货 3已完成 role=1 买家的订单列表 不传或传其他值 卖家的订单列表 p页数
export const order_list = (data) => http.get('order_list', data) 
// service_list 售后列表 参数p
export const service_list = (data) => http.get('service_list', data)
// change_service_status 提交快递单号 参数id售后id，express 快递单号 只有zt=1的时候显示
export const change_service_status = (data) => http.get('change_service_status', data)
// `order_detail` 订单详情 参数order_id 售后记录在list.service里
export const order_detail = (data) => http.get('order_detail', data)
// orderConfirm 创建订单 地址参数 
export const orderConfirm = (data) => http.get('orderConfirm', data)

// order_refund 发起退款 参数id 订单id  订单状态为支付成功的时候 cate=退货 换货  info具体说明  img可以多图
export const order_refund = (data, config) => http.post('order_refund', data, config)
 
// create_order 创建订单 tid团id 不是必填。 address_id  pid_array
// pid_array = array(
//               array('id' => 1,'num' => 1),
//               array('id' => 1,'num' => 3),
//           );
// json字符串  id是库存的id
export const create_order = (data) => http.get('create_order', data)
export const create_order_post = (data, config={}) => http.post('create_order', data, config)
// xcx_pay  微信支付 参数order_id 订单id
export const xcx_pay = (data, config={}) => http.post('xcx_pay', data, config)

// 订单状态  0 待付款 1付款成功 2待收货 3订单完成 
// 4评分完成 5支付中 6支付失败
// 状态0或6的时候能发起支付 
// 1的时候在卖家端出现发货 
// 2的时候在买家端出现确认收货 
// 3的时候买家端出现评分
//0 待付款pay 1付款成功 2待收货 3订单完成 4评分完成 5支付中 6支付失败 7待审核 8审核拒绝edit
 
// change_order_status  改变订单状态（收货/发货） 参数order_id 
export const change_order_status =  (data) => http.get('change_order_status', data)

// order_score 订单评分 参数order_id score 1-5
export const order_score = (data) => http.get('order_score', data)


// web_danye 单页
export const web_danye = (data) => http.get('web_danye', data)
// cate_list  
export const cate_list = (data) => http.get('cate_list', data)
// web_product  参数cate order=2 按分成从高到低排序， 
// order=3 按销量排序 order=4 按价格低到高排序  order=5 按价格高到低排序 
// 其他值或不传默认排序 login=商家账号; zone=1 专区商品
export const web_product = (data) => http.get('web_product', data)
// web_search  
export const web_search = (data) => http.get('web_search', data)
// web_product_detail  
export const web_product_detail = (data) => http.get('web_product_detail', data)
// web_pid_sku1  
export const web_pid_sku1 = (data) => http.get('web_pid_sku1', data)

 // web_help 帮助中心
export const web_help = (data) => http.get('web_help', data)
 // web_help_detail 帮助页详情 参数id
export const web_help_detail = (data) => http.get('web_help_detail', data)

// web_news 公告/资讯列表 p cate num默认20 这个cate是中文的
export const web_news = (data) => http.get('web_news', data)
// web_news_detail 公告/资讯详情 id
export const web_news_detail = (data) => http.get('web_news_detail', data)
// web_tuijian 优选店铺 login 空默认返回列表第一个数据的信息。
export const web_tuijian = (data) => http.get('web_tuijian', data)
// web_tuijian2 推荐店铺 num获取几个数据
export const web_tuijian2 = (data) => http.get('web_tuijian2', data)
// web_login_shop 店铺数据 p cate num login必填
export const web_login_shop = (data) => http.get('web_login_shop', data)
// web_home 首页推荐里的一些数据
export const web_home = (data) => http.get('web_home', data)
// web_home1 首页推荐里的一些数据
export const web_home1 = (data) => http.get('web_home1', data)
// web_company 旺铺信息 参数login 必须
export const web_company = (data) => http.get('web_company', data)


// home1  
export const home1 = (data) => http.get('home1', data)
// home2  
export const home2 = (data) => http.get('home2', data)
 
 //菜单 这里会返回role gx=1就不需要弹出
export const memu = (data) => http.get('memu', data)
//my_company 我的企业信息
// export const my_company = (data) => http.get('my_company', data)
// save_company 创建修改企业信息
// `company`, `img`, `info`, `phone`, `address`,contacts, ewm
// export const save_company = (data, config={}) => http.post('save_company', data, config)

// upimg 上传图片
export const upimg = (data, config) => http.post('upimg', data, config)
// upimg 上传图片 身份证信息专用
export const upimg1 = (data, config) => http.post('upimg', data, config)

// save_info 保存信息 name昵称 img头像
export const save_info = (data) => http.get('save_info', data)
// phone_only 保存手机
export const phone_only = (data, config={}) => http.post('phone_only', data, config)

export const phone_only1 = (data, config={}) => http.post('phone_only1', data, config)

// tuan 团列表 参数p 团列表里有一个字段role=1 团长 =0达人
// export const tuan = (data) => http.get('tuan', data)
// tuan_detail 团详情 参数id 
export const tuan_detail = (data) => http.get('tuan_detail', data)
// tuan_add 新开团 title团标题（团名） info团说明 divide给达人的分成比例1-100。
export const tuan_add = (data, config={}) => http.post('tuan_add', data, config)
// tuan_del 团活动下架 参数id
// export const tuan_del = (data) => http.get('tuan_del', data)

// change_role 身份改变  role=0 买家 1达人 2团长  只能0->2 不能返回。 
export const change_role = (data) => http.get('change_role', data)

// save_invite  接受团长邀请成为达人 参数 id 团长的账号
export const save_invite = (data) => http.get('save_invite', data)
// divide_type 分成状态栏type 
export const divide_type = (data) => http.get('divide_type', data)
// divide 分成列表 参数p 0待付款 1已付款 2订单完成 3可提取 4已提取 5订单关闭
export const divide = (data) => http.get('divide', data)
// daren_list 邀请达人列表 参数p
export const daren_list = (data) => http.get('daren_list', data)
// tuan_list 参数p  员工发展团长
export const tuan_list = (data) => http.get('tuan_list', data)
// divide_analysis 达人分销分析 参数id 达人的账号，达人列表里的did
export const divide_analysis = (data) => http.get('divide_analysis', data)
// selection 参数name tel company person
export const selection = (data) => http.get('selection', data)

// shop_product 参数id 商品id，cate=1增加 2删除
export const shop_product = (data) => http.get('shop_product', data)
// shop_product_list 选品列表
export const shop_product_list = (data) => http.get('shop_product_list', data)
// save_bg 设置背景 参数bg
export const save_bg = (data) => http.get('save_bg', data)
// save_shop 配置特卖店 参数name img info bg
export const save_shop = (data, config={}) => http.post('save_shop', data, config)

// follow 关注特卖店 参数follow=页面带的参数userid
export const follow = (data) => http.get('follow', data)
// follow_list 关注列表 参数p login
export const follow_list = (data) => http.get('follow_list', data)

//get_url 参数url
export const get_url = (data) => http.get('get_url', data)


// save_linghuo 实名认证接口 参数 
// 			name姓名 id_card身份证号码 phone手机 bank_account银行卡或支付宝账号
 // 		front_img 身份证人头面的图片地址 back_img 身份证反面的图片地址 avatar_img 人像照的图片地址
export const save_linghuo = (data, config={}) => http.post('save_linghuo', data, config)

// linghuo 实名详情 参数无  zt=2的时候不允许再修改
export const linghuo = (data) => http.get('linghuo', data)
// add_linghuo_transfer  提现操作
export const add_linghuo_transfer = (data) => http.get('add_linghuo_transfer', data)
// divide1  可提现列表 
export const divide1 = (data) => http.get('divide1', data)
// zt_detail 专题详情接口 参数id 专题id，测试专题id=1  没有翻页。
export const zt_detail = (data) => http.get('zt_detail', data)

// product_longs 种草列表（逛列表）参数p 商品id
export const product_longs = (data) => http.get('product_longs', data)
// product_longs_detail 种草详情  参数id
export const product_longs_detail = (data) => http.get('product_longs_detail', data)
// add_product_longs 发布种草 参数id 商品id info笔记（文案） pic图片多个图片中间用符号隔开
export const add_product_longs = (data, config={}) => http.post('add_product_longs', data, config) 
// get_vod_sign 获取视频上传签名
export const get_vod_sign = (data, config={}) => http.post('get_vod_sign', data, config) 

// coupon_list 活动列表
export const coupon_list = (data) => http.get('coupon_list', data)
// coupon_detail 参数id
export const coupon_detail = (data) => http.get('coupon_detail', data)
// get_coupon 领优惠券 参数hid=活动id  hid=0 领新人券
export const get_coupon = (data) => http.get('get_coupon', data)
// my_coupon_list 我的优惠券
export const my_coupon_list = (data) => http.get('my_coupon_list', data)
// search_coupon 订单可用优惠券 参数id=订单id
export const search_coupon = (data) => http.get('search_coupon', data)
// use_coupon 使用优惠券 参数id=订单id guid=优惠券guid
export const use_coupon = (data) => http.get('use_coupon', data)

// tuan_ranking 团长周排行榜 参数cate=0或不传 默认本周排行榜 cate=1 上周排行榜
export const tuan_ranking = (data) => http.get('tuan_ranking', data)
// daren_ranking 达人周排行榜 参数cate=0或不传 默认本周排行榜 cate=1 上周排行榜
export const daren_ranking = (data) => http.get('daren_ranking', data)

// longs_new 笔记列表 参数p login
export const longs_new = (data) => http.get('longs_new', data)
// add_longs_new 新增笔记 参数跟前面一直。参数id 商品id可以为空，也可以为多个以英文逗号隔开的字符串。
export const add_longs_new = (data, config={}) => http.post('add_longs_new', data, config) 
// longs_detail_new 笔记详情 参数id 笔记id
export const longs_detail_new = (data) => http.get('longs_detail_new', data)
// longs_like 点赞笔记 参数id 笔记id
export const longs_like = (data) => http.get('longs_like', data)
// edit_longs_product 笔记关联商品编辑  cate=0 新增 1删除 id笔记id pid商品id，这里只能是一个商品的id
export const edit_longs_product = (data) => http.get('edit_longs_product', data)


// save_qy_role 标记企业身份  参数qy=0 一般用户 1 企业用户
export const save_qy_role = (data) => http.get('save_qy_role', data)

// longs_memu 笔记菜单
export const longs_memu = (data) => http.get('longs_memu', data)
// search_login_tuan 参数id=团长账号
export const search_login_tuan = (data) => http.get('search_login_tuan', data)
// search_shop_product 橱窗商品列表  参数terms 商品搜索 不带就是全部
export const search_shop_product = (data) => http.get('search_shop_product', data)

// web_preferred 优选列表 参数cate p
export const web_preferred = (data) => http.get('web_preferred', data)

// add_company_product 选品员工导入商家全部上架商品
export const add_company_product = (data) => http.get('add_company_product', data)

// add_invoice 订单开发票 参数order 订单id name公司名称 no纳税人识别号 address地址 tel电话 bank开户行 account银行账号 email邮箱
export const add_invoice = (data, config={}) => http.post('add_invoice', data, config) 

// sub_invoice 发票推送给供应商 参数order订单id 在推送前，add_invoice接口可以编辑信息。
export const sub_invoice = (data) => http.get('sub_invoice', data)

// order_invoice 订单开票信息 参数order订单id，会返回一个开票信息列表记录，可以复用这些信息，根据纳税人识别号会过滤相同信息。信息详情里面zt不等于0，就不允许修改了。
export const order_invoice = (data) => http.get('order_invoice', data)

// 在订单详情接口 button9 申请开票按钮，点按钮就打开一个页面（可以弹窗），就是编辑订单开发票页面，默认就去读取order_invoice接口。


// vouchers_bind 绑定电子券 参数id卡号 纯数字; guid密码 字符串有符合-
export const vouchers_bind = (data) => http.get('vouchers_bind', data)

// web_zone  
export const web_zone = (data) => http.get('web_zone', data)
// web_login_coupon 商家券活动列表 参数login=商家账号
export const web_login_coupon = (data) => http.get('web_login_coupon', data)


// community_address 自提地址列表 参数p
export const community_address = (data) => http.get('community_address', data)
// community_address_detail 地址详情 参数id
export const community_address_detail = (data) => http.get('community_address_detail', data)
// community_address_save 地址新增/修改 参数 id修改时需要传 address_name 自提点名称 area地区编码 area_name地区 address详细地址 default=1默认 0不默认 name收货人 tel联系电话
export const community_address_save = (data) => http.get('community_address_save', data)
// community_address_del 删除地址 参数id
export const community_address_del = (data) => http.get('community_address_del', data)

// orderConfirm1 参数id 商品id tid团id（这个是根据url里面参数tid来，没有就传0）
export const orderConfirm1 = (data) => http.get('orderConfirm1', data)
// web_product1 社区团购商品列表 多一个字段terms  直接在这个接口搜索。
export const web_product1 = (data) => http.get('web_product1', data)
// web_product_detail1 社区团购商品详情
export const web_product_detail1 = (data) => http.get('web_product_detail1', data)
export const create_order_post1 = (data, config={}) => http.post('create_order1', data, config)
// order_list1 订单列表
export const order_list1 = (data) => http.get('order_list1', data)
// order_detail1 订单详情 
export const order_detail1 = (data) => http.get('order_detail1', data)
  
// order_list2 社区团购 团长查看的订单列表 参数一致 多一个参数tel  根据手机号或尾号搜索 最多返回一页数据。
export const order_list2 = (data) => http.get('order_list2', data)
// order_detail2 订单详情 社区团购 团长查看的订单详情 参数一致
// 订单详情页  确认提货 拒绝提货 2个按钮  对应接口button2_handle button4_handle 参数都是id 订单id
export const order_detail2 = (data) => http.get('order_detail2', data)
// button2_handle  确认提货
export const button2_handle = (data) => http.get('button2_handle', data)
// button4_handle 拒绝提货
export const button4_handle = (data) => http.get('button4_handle', data)
// memu2  
export const memu2 = (data) => http.get('memu2', data)


// add_pic_text 新增图文库 参数id 商品id info文 pic图
export const add_pic_text = (data, config={}) => http.post('add_pic_text', data, config)
// pic_text_list 我的图文列表 参数p
export const pic_text_list = (data) => http.get('pic_text_list', data)
// pid_pic_text_list 商品图文列表 参数 pid商品id p
export const pid_pic_text_list = (data) => http.get('pid_pic_text_list', data)
// pic_text_list_all 全部商品图片列表 参数p
export const pic_text_list_all = (data) => http.get('pic_text_list_all', data)