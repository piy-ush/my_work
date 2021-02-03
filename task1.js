let empData=[
{empcode:'A102', name:'James', age:37, gender:'Male', department:'Finance',
designation:'Manager', salary:65000},
{empcode:'A106', name:'Mary', age:24, gender:'Female', department:'Technology',
designation:'Vice-President', salary:68000},
{empcode:'A122', name:'Bob', age:23, gender:'Male', department:'Marketing',
designation:'Manager', salary:51000},
{empcode:'A088', name:'Julia', age:33, gender:'Female', department:'Finance',
designation:'Vice-President', salary:70000},
{empcode:'A055', name:'Steve', age:27, gender:'Male', department:'Technology',
designation:'Manager', salary:53000},
{empcode:'A208', name:'Katherine', age:29, gender:'Female', department:'Marketing',
designation:'Manager', salary:61000},
{empcode:'A181', name:'Edwards', age:31, gender:'Male', department:'Finance',
designation:'Trainee', salary:49000},
{empcode:'A029', name:'Margaret', age:32, gender:'Female', department:'Technology',
designation:'President', salary:53000},
{empcode:'A029', name:'Bill', age:27, gender:'Male', department:'Operations',
designation:'Manager', salary:58000}
]

let dept=["Finance","Technology","Marketing","Operations"]
let desig=["Manager","Vice-President","President","Trainee"]
let editIndex=-1;
let editData={}

show()
function show(){
	let head=document.getElementById("btn-head")
	let str='<br><button class=\"btn\" onclick="newEmployee()">New Employee</button>';
	str+='<label> </label>'
  str+='<button class=\"btn\" onclick="allEmployees(empData)">All Employees</button>';
	str+='<label> </label>'
	str+='<button class=\"btn\" onclick="fullDump()">Full Dump</button>';
	str+='<label> </label>'
	str+='<button class=\"btn\" onclick="partialDump()">Partial Dump</button><br>';
	head.innerHTML=str;
}
function newEmployee(){
	let {empcode='',name='',age='',gender='',department='',
	designation='',salary=''}=editData;
	let btnText=''
	let code=''
	if(editIndex>=0){
		btnText='Edit Employee'
		code='readonly'
	}
	else{
		btnText='Add New Employee'
	}
	let maleGender=""
	let femaleGender=""
	if(gender==="Male")
		maleGender="checked"
	else if(gender==="Female")
		femaleGender="checked"
	let form='<br><label>Employee Code </label>'
	form+='<input type="text" id="code" value="'+empcode+'" '+code+'><br>'
	form+='<br><label>Name </label>'
	form+='<input type="text" id="name" value="'+name+'"><br>'
	form+='<br><label>Age </label>'
	form+='<input type="text" id="age" value="'+age+'"><br>'
	form+='<br><label>Gender </label>'
	form+='<input type="radio" name="gender" value="Male" '+maleGender+
	'><label>Male </label>'
	form+='<input type="radio" name="gender" value="Female" '+femaleGender+
	'><label>Female </label><br>'
	form+='<br><label>Department </label>'
	form+='<select class=\"dropDown\" id="dept">'
	form+='<option selected hidden disabled value="">Choose Department</option>'
	dept.map(d=>{
		let deptCheck=""
		if(department===d)
			deptCheck="selected"
		form+='<option value="'+d+'" '+deptCheck+'>'+d+'</option>'
	})
	form+='</select><br>'
	form+='<br><label>Designation </label>'
	form+='<select class=\"dropDown\" id="desig">'
	form+='<option selected hidden disabled value="">Choose Designation</option>'
	desig.map(d=>{
		let desigCheck=""
		if(designation===d)
			desigCheck="selected"
		form+='<option value="'+d+'" '+desigCheck+'>'+d+'</option>'
	})
	form+='</select><br>'
	form+='<br><label>Salary </label>'
	form+='<input type="text" id="salary" value="'+salary+'"><br>'
	form+='<br><button class=\"btn\" onclick="addEmployee()">'+btnText+'</button>'
	let data=document.getElementById("data")
	data.innerHTML=form
}
function addEmployee(){
	let code=document.getElementById("code").value
	let name=document.getElementById("name").value
	let age=document.getElementById("age").value
	let dept=document.getElementById("dept").value
	let desig=document.getElementById("desig").value
	let salary=document.getElementById("salary").value
	let radios=document.getElementsByName("gender")
	let gender=""
	for(let i=0; i<radios.length; i++){
		if(radios[i].checked)
			gender=radios[i].value
	}
	let flag=0
	empData.find(f=>f.empcode===code ? flag++ : 0)
	
	if(code==='')
		alert("Please enter Employee Code")
	else if(flag>0 && editIndex===-1)
		alert("Employee Code already exist, try another.")
	else if(name==='')
		alert("Please enter Employee Name")
	else if(age==='')
		alert("Please enter Employee Age")
	else if(dept==='')
		alert("Please select Employee Department")
	else if(desig==='')
		alert("Please select Employee Designation")
	else if(salary==='')
		alert("Please enter Employee Salary")
	else if(gender==='')
		alert("Please select Employee Gender")
	else{
		if(editIndex>=0){
			empData[editIndex].name=name
			empData[editIndex].age=age
			empData[editIndex].gender=gender
			empData[editIndex].department=dept
			empData[editIndex].designation=desig
			empData[editIndex].salary=salary
			allEmployees(empData);
		}
		else{
			let obj={empcode:code,name:name,age:age,gender:gender,department:dept,
				designation:desig,salary:salary}
			empData.push(obj)
			allEmployees(empData);
		}
	}
}
function allEmployees(array){
	let html='<br><label>Filter Employees by </label>'
	html+='<select class=\"dropDown\" id="deptSelect">'
	html+='<option selected hidden disabled>Choose Department</option>'
	dept.map(d=>{
		html+='<option>'+d+'</option>'
	})
	html+='</select>'
	html+='<label> </label>'
	html+='<select class=\"dropDown\" id="desigSelect">'
	html+='<option selected hidden disabled>Choose Designation</option>'
	desig.map(d=>{
		html+='<option>'+d+'</option>'
	})
	html+='</select>'
	html+='<label> </label>'
	html+='<button class=\"btn\" onclick="filter()">Filter</button><br>'
	let tableData=array.map((emp,index)=>{
		let str='<tr>'
		str+='<td class=\"td\">'+emp.empcode+'</td>'
		str+='<td class=\"td\">'+emp.name+'</td>'
		str+='<td class=\"td\">'+emp.age+'</td>'
		str+='<td class=\"td\">'+emp.gender+'</td>'
		str+='<td class=\"td\">'+emp.department+'</td>'
		str+='<td class=\"td\">'+emp.designation+'</td>'
		str+='<td class=\"td\">'+emp.salary+'</td>'
		str+='<td class=\"td\">'+'<button class=\"btn\" onclick="edit('+index+
		')">Edit</button>'+'</td>'
		str+='</tr>'
		return str
	})
	html+='<br><table class=\"table\">'
	html+='<tr>'
	html+='<th class=\"th\" onclick="sort(0)">Emp Code</th>'
	html+='<th class=\"th\" onclick="sort(1)">Name</th>'
	html+='<th class=\"th\" onclick="sort(2)">Age</th>'
	html+='<th class=\"th\" onclick="sort(3)">Gender</th>'
	html+='<th class=\"th\" onclick="sort(4)">Department</th>'
	html+='<th class=\"th\" onclick="sort(5)">Designation</th>'
	html+='<th class=\"th\" onclick="sort(6)">Salary</th>'
	html+='<th class=\"th\"></th>'
	html+='</tr>'
	html+=tableData.join('')
	html+='</table>'
	let data=document.getElementById("data")
	data.innerHTML=html
}
function sort(colNo){
	switch(colNo){
		case 0: empData.sort((v1,v2)=> v1.empcode.localeCompare(v2.empcode))
		break;
		case 1: empData.sort((v1,v2)=> v1.name.localeCompare(v2.name))
		break;
		case 2: empData.sort((v1,v2)=> v1.age - v2.age)
		break;
		case 3: empData.sort((v1,v2)=> v1.gender.localeCompare(v2.gender))
		break;
		case 4: empData.sort((v1,v2)=> v1.department.localeCompare(v2.department))
		break;
		case 5: empData.sort((v1,v2)=> v1.designation.localeCompare(v2.designation))
		break;
		case 6: empData.sort((v1,v2)=> v1.salary - v2.salary)
		break;
	}
	allEmployees(empData);
}
function edit(index){
	editIndex=index
	editData=empData[index]
	newEmployee();
}
function filter(){
	let deptSelect=document.getElementById("deptSelect").value
	let desigSelect=document.getElementById("desigSelect").value
	if(deptSelect==="Choose Department" && desigSelect==="Choose Designation"){
		allEmployees(empData);
	}
	else{
		let newData = empData.filter(f=>{
			if(f.department===deptSelect && desigSelect==="Choose Designation")
				return f;
			else if(deptSelect==="Choose Department" && f.designation===desigSelect)
				return f;
			else if(f.department===deptSelect && f.designation===desigSelect)
				return f;
		})
		allEmployees(newData);
		// console.log(newData)
	}
	document.getElementById("deptSelect").value='Choose Department'
	document.getElementById("desigSelect").value='Choose Designation'
}
function fullDump(){
	let dump=empData.map(fd=>{
		return (fd.empcode+'::'+fd.name+'::'+fd.age+'::'+fd.gender+'::'
		+fd.department+'::'+fd.designation+'::'+fd.salary)
	})
	let dumpHTML=document.getElementById("data")
	dumpHTML.innerHTML=JSON.stringify(dump)
}
function partialDump(){
	let dump=empData.map(pd=>{
		return ('Code='+pd.empcode+',Name='+pd.name+',Age='+pd.age)
	})
	let dumpHTML=document.getElementById("data")
	dumpHTML.innerHTML=JSON.stringify(dump)
}