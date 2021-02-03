let products=[
{"prodcode":"PEP122","prodname":"Pepsi","price":12,"category":"Food","offer":"10%"},
{"prodcode":"COK238","prodname":"Coke","price":15,"category":"Food","offer":"15%"},
{"prodcode":"MIR411","prodname":"Mirinda","price":30,"category":"Food","offer":"20%"},
{"prodcode":"RB0277","prodname":"Red Bull","price":80,"category":"Food","offer":"None"},
{"prodcode":"LUX831","prodname":"Lux","price":10,"category":"Soap","offer":"15%"},
{"prodcode":"DOV672","prodname":"Dove","price":25,"category":"Soap","offer":"20%"},
{"prodcode":"DET810","prodname":"Dettol","price":15,"category":"Soap","offer":"None"},
{"prodcode":"PAN590","prodname":"Pantene","price":60,"category":"Shampoo","offer":"None"},
{"prodcode":"SUN677","prodname":"Sunsilk","price":48,"category":"Shampoo","offer":"15%"},
{"prodcode":"GAR004","prodname":"Garnier","price":75,"category":"Shampoo","offer":"10%"}
]

let orders=[
{"custname":"Jack Smith","mobile":"425361434","location":"Sector 14","slot":"12PM-2PM",
"value":72.6,"items":[{"prodcode":"PEP122","quantity":2},
{"prodcode":"COK238","quantity":4}]},
{"custname":"Mary Gomes","mobile":"723476123","location":"Sector 22","slot":"4PM-6PM",
"value":130.60,"items":[{"prodcode":"SUN677","quantity":2},
{"prodcode":"LUX831","quantity":4},{"prodcode":"DET810","quantity":1}]},
{"custname":"Tim May","mobile":"835099614","location":"Pioneer Chowk",
"slot":"Before 10AM","value":705,"items":[{"prodcode":"GAR004","quantity":6},
{"prodcode":"RB0277","quantity":
3},{"prodcode":"MIR411","quantity":2}]}
]

let prodCode=['PEP122','COK238','MIR411','RB0277','LUX831',
'DOV672','DET810','PAN590','SUN677','GAR004']
let locations=['Sector 14A', 'Sector 15B','Sector 22', 'Pioneer Chowk']
let delivery=['Before 10AM','10AM-12PM','12PM-2PM','2PM-4PM','4PM-6PM','After 6PM']
let addOrder=[]

show()
function show(){
	let head=document.getElementById("btn-head")
	let str='<br><button class=\"btn\" onclick="showProducts()">Products</button>';
	str+='<button class=\"btn\" onclick="newOrder()">Enter an Order</button>';
	str+='<button class=\"btn\" onclick="showOrders()">All Orders</button>';
	head.innerHTML=str;
}
function showProducts(){
	let tableData=products.map((p,index)=>{
		let str='<tr>'
		str+='<td class=\"td\">'+p.prodcode+'</td>'
		str+='<td class=\"td\">'+p.prodname+'</td>'
		str+='<td class=\"td\">'+p.price+'</td>'
		str+='<td class=\"td\">'+p.category+'</td>'
		str+='<td class=\"td\">'+p.offer+'</td>'
		str+='</tr>'
		return str
	})
	let html='<br><table class=\"table\">'
	html+='<tr>'
	html+='<th class=\"th\">Code</th>'
	html+='<th class=\"th\">Name</th>'
	html+='<th class=\"th\">Price</th>'
	html+='<th class=\"th\">Category</th>'
	html+='<th class=\"th\">Discount</th>'
	html+='</tr>'
	html+=tableData.join('')
	html+='</table>'
	let data=document.getElementById("data")
	data.innerHTML=html
}
function newOrder(){
	let form='<br><label class="label">Customer Name: </label>'
	form+='<input type="text" id="name">'
	form+='<br><label class="label">Mobile Number: </label>'
	form+='<input type="text" id="number">'
	form+='<br><label class="label">Location: </label>'
	form+='<select id="location">'
	form+='<option selected hidden disabled>Choose Location</option>'
	locations.map(f=>{
		form+='<option>'+f+'</option>'
	})
	form+='</select>'
	form+='<br><label class="label">Delivery Slot: </label>'
	form+='<select id="slot">'
	form+='<option selected hidden disabled>Choose Delivery Slot</option>'
	delivery.map(f=>{
		form+='<option>'+f+'</option>'
	})
	form+='</select>'
	form+='<br><label class="label">Add to Order: </label>'
	form+='<select id="selectProduct">'
	form+='<option selected hidden disabled>Select Product</option>'
	prodCode.map(f=>{
		form+='<option>'+f+'</option>'
	})
	form+='</select>'
	form+='<select id="selectQuantity">'
	form+='<option selected hidden disabled>Select Quantity</option>'
	for(let i=1; i<=10; i++){
		form+='<option>'+i+'</option>'
	}
	form+='</select>'
	form+='<button class=\"btn\" onclick="addToOrder()">Add to Order</button>'
	form+='<div class="alignBtn">'
	form+='<button class=\"btn\" onclick="complete()">Order Complete</button>'
	form+='<button class=\"btn\" onclick="cancel()">Cancel Order</button>'
	form+='</div>'
	form+='<div id="tableOrder">'
	form+='<table class=\"table\">'
	form+='<tr>'
	form+='<th class=\"th\">Code</th>'
	form+='<th class=\"th\">Name</th>'
	form+='<th class=\"th\">Price</th>'
	form+='<th class=\"th\">Quantity</th>'
	form+='<th class=\"th\">Discount</th>'
	form+='<th class=\"th\">Net Amount</th>'
	form+='<th class=\"th\"></th>'
	form+='</tr>'
	form+='</table>'
	form+='</div>'
	let data=document.getElementById("data")
	data.innerHTML=form
}
let check=0;
function complete(){
	let name=document.getElementById("name").value
	let number=document.getElementById("number").value
	let location=document.getElementById("location").value
	let slot=document.getElementById("slot").value
	if(addOrder.length===0)
		alert("Select atleast one product to place order.")
	else{
		if(name.length<5)
			alert("Name should be atlest 5 characters long.")
		else if(number.length<10 || number.length>10)
			alert("Number should be of length 10")
		else if(number.length===10 && check===0){
			for(let i=0; i<number.length; i++){
				if(number[i]>='a'&&number[i]<='z'){
					check=0
					alert("Characters not allowed in number.")
				}
				else
					check++;
			}
		}
		else if(location==="Choose Location")
			alert("Select location")
		else if(slot==="Choose Delivery Slot")
			alert("Choose delivery slot")
		else{
			let json={}
			json.custname=name
			json.mobile=number
			json.location=location
			json.slot=slot
			let val=0
			let details=[]
			addOrder.map(f=>{
				let json1={}
				val+=f.netAmount
				json1.prodcode=f.prodcode
				json1.quantity=f.quantity
				details.push(json1)
			})
			json.value=val
			json.items=details
			orders.unshift(json)
			addOrder=[]
			showOrders()
		}
	}
}
function cancel(){
	document.getElementById("name").value=""
	document.getElementById("number").value=""
	document.getElementById("location").value="Choose Location"
	document.getElementById("slot").value="Choose Delivery Slot"
	document.getElementById("selectProduct").value="Select Product"
	document.getElementById("selectQuantity").value="Select Quantity"
	addOrder=[]
	createTable()
}
function addToOrder(){
	let prod=document.getElementById("selectProduct").value
	let quant=document.getElementById("selectQuantity").value
	if(prod==="Select Product")
		alert("Please Select Product")
	else if(quant==="Select Quantity")
		alert("Please Select Quantity")
	else{
		if(addOrder.find(f=>f.prodcode===prod)){
			let exist=addOrder.find(f=>f.prodcode===prod ? f : 0)
			exist.quantity=1*exist.quantity+1*quant
			let discount=exist.discount==='10%'?0.1:
				(exist.discount==='15%'?0.15:(exist.discount==='20%'?0.2:0))
			let amount=(1*exist.price) * (1*quant)
			let net=amount - (amount * discount)
			exist.netAmount=1*exist.netAmount+1*net
			createTable(addOrder);
			document.getElementById("selectProduct").value="Select Product"
			document.getElementById("selectQuantity").value="Select Quantity"
		}
		else{
			let details=products.find(f=>f.prodcode===prod ? f : 0)
			let discount=details.offer==='10%'?0.1:
				(details.offer==='15%'?0.15:(details.offer==='20%'?0.2:0))
			let amount=details.price * quant
			let netAmount=amount - (amount * discount)
			let json={}
			json.prodcode=details.prodcode
			json.prodname=details.prodname
			json.price=details.price
			json.quantity=quant
			json.discount=details.offer
			json.netAmount=netAmount
			addOrder.push(json)
			// console.log(addOrder)
			createTable(addOrder);
			document.getElementById("selectProduct").value="Select Product"
			document.getElementById("selectQuantity").value="Select Quantity"
		}
	}
}
function createTable(arr){
	let str='<table class=\"table\">'
		str+='<tr>'
		str+='<th class=\"th\">Code</th>'
		str+='<th class=\"th\">Name</th>'
		str+='<th class=\"th\">Price</th>'
		str+='<th class=\"th\">Quantity</th>'
		str+='<th class=\"th\">Discount</th>'
		str+='<th class=\"th\">Net Amount</th>'
		str+='<th class=\"th\"></th>'
		str+='</tr>'
		addOrder.map((t,index)=>{
			str+='<tr>'
			str+='<td class=\"td\">'+t.prodcode+'</td>'
			str+='<td class=\"td\">'+t.prodname+'</td>'
			str+='<td class=\"td\">'+t.price+'</td>'
			str+='<td class=\"td\">'+t.quantity+'</td>'
			str+='<td class=\"td\">'+t.discount+'</td>'
			str+='<td class=\"td\">'+t.netAmount+'</td>'
			str+='<td class=\"td\">'
			str+='<button class=\"btn\" onclick="remove('+index+')">Remove</button>'
			str+='</td>'
			str+='<tr>'
		})
		str+='</table>'
	let data=document.getElementById("tableOrder")
	data.innerHTML=str
}
function remove(index){
	addOrder.splice(index,1);
	createTable();
}
function showOrders(){
	let tableData=orders.map((p,index)=>{
		let str='<label>Customer Name: '+p.custname+', Mobile: '+p.mobile+
		', Location: '+p.location+', Delivery Slot: '+p.slot+', Order Value: '
		+p.value+', Number of items: '+p.items.length
		str+='<table class=\"table\">'
		str+='<tr>'
		str+='<th class=\"th\">Code</th>'
		str+='<th class=\"th\">Name</th>'
		str+='<th class=\"th\">Price</th>'
		str+='<th class=\"th\">Quantity</th>'
		str+='<th class=\"th\">Discount</th>'
		str+='<th class=\"th\">Net Amount</th>'
		str+='</tr>'
		p.items.map(t=>{
			str+='<tr>'
			let details=products.find(f=>{
				return t.prodcode===f.prodcode
			})
			str+='<td class=\"td\">'+t.prodcode+'</td>'
			str+='<td class=\"td\">'+details.prodname+'</td>'
			str+='<td class=\"td\">'+details.price+'</td>'
			str+='<td class=\"td\">'+t.quantity+'</td>'
			str+='<td class=\"td\">'+details.offer+'</td>'
			let total=details.price * t.quantity
			let discount=details.offer==='10%'?0.1:
				(details.offer==='15%'?0.15:(details.offer==='20%'?0.2:0))
			let net=total - total*discount
			str+='<td class=\"td\">'+net+'</td>'
			str+='<tr>'
		})
		str+='</table>'
		return str;
	})
	let data=document.getElementById("data")
	data.innerHTML=tableData.join("")
}