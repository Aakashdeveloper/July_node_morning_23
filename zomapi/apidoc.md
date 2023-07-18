//page1
> List of all cities
* http://localhost:8770/location

> List of all restaurants
* http://localhost:8770/restaurants

> Restaurants wrt city
* http://localhost:8770/restaurants?stateId=4

> List of meals
* http://localhost:8770/mealType

//Page2
> Restaurants wrt meal
* http://localhost:8770/restaurants?mealId=4

> Filter wrt to meal + cuisine
* http://localhost:8770/filters/1?cuisineId=1

> Filter wrt to meal + cost
* http://localhost:8770/filters/1?lcost=100&hcost=500

> Sort on basis of price 
* http://localhost:8770/filters/1?cuisineId=1&sort=1

> Pagination
* http://localhost:8770/filters/1?cuisineId=1&sort=1&skip=1&limit=2

// Page3
> Details of the restaurant
* http://localhost:8770/details/6288d22dbb17b75750d11ca8

> Menu wrt to restaurant
* http://localhost:8770/menu/4

//Page4
> Details of selected menu
* 

> Place Order (POST)
* http://localhost:8770/placeOrder
{
	"orderId" : 3,
	"name" : "Amit",
	"email" : "amit@gmail.com",
	"address" : "Hom 65",
	"phone" : 8934645457,
	"cost" : 612,
	"menuItem" : [
		45,
		34,
		41
	],
	"status" : "Pending"
}

//Page5
> View all orders/ wrt email
* http://localhost:8770/orders
* http://localhost:8770/orders?email=a@a.com

> Update order details (PUT)
* http://localhost:8770/updateOrder
{
    "_id": "64b6108c31dde77bb3af13bf",
    "status":"Delivered"
}


> Delete orders
* http://localhost:8770/deleteOrder
{
    "_id": "64b610d831dde77bb3af13c1"
}


C > Create > POST
R > Read   > GET
U > Update > PUT
D > Delete > Delete