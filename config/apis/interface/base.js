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
  
// `create_order` 生成订单 参数pid_array  address_id
// json格式，每一条记录包含： cid表示旺铺ID，pid商品ID，num表示购买的商品数量
// export const create_order = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'create_order'}}))
// `order_list` 订单列表  参数type 1待付款 2待收货 3已完成 role=1 买家的订单列表 不传或传其他值 卖家的订单列表 p页数
export const order_list = (data) => http.get('order_list', data)
// `order_detail` 订单详情 参数order_id
export const order_detail = (data) => http.get('order_detail', data)
// orderConfirm 创建订单 地址参数 
export const orderConfirm = (data) => http.get('orderConfirm', data)
 
// create_order 创建订单 tid团id 不是必填。 address_id  pid_array
// pid_array = array(
//               array('id' => 1,'num' => 1),
//               array('id' => 1,'num' => 3),
//           );
// json字符串  id是库存的id
export const create_order = (data) => http.get('create_order', data)
// xcx_pay  微信支付 参数order_id 订单id
export const xcx_pay =  (data, config={}) => http.post('xcx_pay', data, config)

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
// web_product  
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

// save_info 保存信息 name昵称 img头像
export const save_info = (data) => http.get('save_info', data)

// tuan 团列表 参数p
export const tuan = (data) => http.get('tuan', data)
// tuan_detail 团详情 参数id 
export const tuan_detail = (data) => http.get('tuan_detail', data)
// tuan_add 新开团 title团标题（团名） info团说明 divide给达人的分成比例1-100。
export const tuan_add = (data) => http.get('tuan_add', data)
// change_role 身份改变  role=0 买家 1达人 2团长  只能0->2 不能返回。 
export const change_role = (data) => http.get('change_role', data)
