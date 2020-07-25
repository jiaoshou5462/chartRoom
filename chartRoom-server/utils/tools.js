//保存的数据类型
let classToType = {};

let tools = {
	/**
	 * @description 得到唯一id
	 * @function getOnlyId
	 * @param {Int}  len id的随机的长度,除去router_
	 * @memberof tools
	 * @returns [String] id
	 */
	getOnlyId: function(len) {
		let str = '';
		len = len || 8;
		for (; str.length < len; str += Math.random().toString(36).substr(2));
		return str.substr(0, len).replace(/^\d/, 'a') + this.Id++;
	},
	/**
	 * @description 深复制对象或数组
	 * @function deepCopy
	 * @param {Object}  obj 需要复制的对象
	 * @memberof tools
	 * @returns [Object] 拷贝的新对象
	 */
	deepCopy: function(obj) {
		if (this.type(obj) == 'array') {
			let n = [];
			for (let i = 0; i < obj.length; i++) {
				n[i] = this.deepCopy(obj[i]);
			}
			return n;

		} else if (this.type(obj) == 'object') {
			let n = {};
			for (let i in obj) {
				n[i] = this.deepCopy(obj[i]);
			}
			return n;
		} else {
			return obj;
		}
	},
	/**
	 * @description 获取数据类型
	 * @function type
	 * @param {Object}  obj 目标对象
	 * @memberof utils
	 * @returns {String} 对象的类型
	 */
	type: function(obj) {
		return obj == null ?
			String(obj) :
			classToType[Object.prototype.toString.call(obj)] || 'object';
	},
	/**
	 * @description 对目标对象进行遍历
	 * @function each
	 * @param {Object}  object 需要遍历的对象
	 * @param {Function}  cb 回调方法
	 * @param {context}  context 运行环境
	 * @memberof utils
	 */
	each: function(object, cb, context) {

		if (!object) return;
		let name, i = 0,
			length = object.length;
		let isObj = length == undefined; //判断是对象还是类数组   

		if (isObj) {
			for (name in object) {
				if (cb.call(context ? context : object[name], name, object[name]) === false) {
					break;
				}
			}
		} else {
			//遍历类数组元素
			/* eslint-disable */
			for (; i < length && false !== cb.call(context ? context : object, i, object[i++]);) {};

		}

		//这里返回的object是被修改后的对象或数组   
		// return object;
	},
	//获取两位小数的浮点数 返回number类型
	getFloatTwo(str){
		let amount = str+'';
		if(/\./.test(amount)){
			let split = amount.split('.');
			if(split[1].length>2){
				let three = split[1].substr(2,1);
				let oneTwo = Number(split[1].substr(0,2));
				if(three>5){
					amount = `${split[0]}.${oneTwo+1}`;
				}else{   
					amount = `${split[0]}.${oneTwo}`;
				}
			}
		}
		return Number(amount);
	},
	toFloatStr(str, n) {
		if (n > 20) {
			n = 20;
		} else if (n < 0) {
			n = 0;
		}
		if (str.length > 20) return str;
		let num = parseFloat('0' + str.replace(/[^\d.]/, '')) + '';
		if (num.indexOf('.') > 0) {
			let arr = num.split('.');
			n = n - arr[1].length;
		} else {
			num += '.';
		}
		if (n > 0) {
			while (n > 0) {
				num += '0';
				n--;
			}
		} else if (n < 0) {
			num = num.substring(0, num.length + n);
		}
		return num;
	},
	/** 
	 * 获取任意指定的时间的 凌晨时间 午夜时间 当前时间 和指定格式话后的时间
	 *  @param {Object} 
	 *      time 原始时间 (可以接受new Date(),毫秒数,秒数)
	 *      type 返回的时间是以秒还是毫秒 true 毫秒 false 秒
	 *      format 指定返回值format中的是时间格式
	 *  @returns {Object} 计算后的数值    
	 *      start 凌晨时间
	 *      end 午夜时间
	 *      format 格式化之后的时间
	 *      now 以毫秒或者秒表示的时间
	 * 
	 */
	getTime({
		time,
		type = true,
		format = 'yyyy/MM/dd hh:mm'
	}) {
		if (!(time instanceof Date)) {
			//毫数
			if ((time + '').length == 10) {
				time = new Date(Number(time) * 1000)
			} else {
				time = new Date(Number(time));
			}

		} else {
			time = new Date(time.getTime());
		}
		if (time.toString() === 'Invalid Date') {
			throw new Error('日期格式错误');;
		}
		let start = time.setHours(0, 0, 0, 0);
		let end = start + 24 * 1000 * 60 * 60 - 1;
		start = !type ? start / 1000 : start;
		end = Math.floor(!type ? end / 1000 : end);
		let forM = this.format(time, format);
		let now = time.getTime();
		now = !type ? now / 1000 : now;
		return {
			start,
			end,
			now,
			format: forM
		};

	},
	/**
	 * 日期对象方法扩展
	 * 
	 * @param {String} fmt yy qq MM dd:hhmmss SS
	 */
	format: function ($time, fmt) { //author: meizz 
		if (!($time instanceof Date)) {
			//毫数
			if (($time + '').length == 10) {
				$time = new Date(Number($time) * 1000)
			} else {
				$time = new Date(Number($time));
			}

		}
		let o = {
			'M+': $time.getMonth() + 1, //月份 
			'd+': $time.getDate(), //日 
			'h+': $time.getHours(), //小时 
			'm+': $time.getMinutes(), //分 
			's+': $time.getSeconds(), //秒 
			'q+': Math.floor(($time.getMonth() + 3) / 3), //季度 
			'S': $time.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ($time.getFullYear() + '').substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		return fmt;
	},
}

//将数据类型存储
tools.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function(i, name) {
	classToType['[object ' + name + ']'] = name.toLowerCase();
});

module.exports = tools