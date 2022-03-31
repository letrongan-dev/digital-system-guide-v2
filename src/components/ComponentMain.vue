<template>
<div>
    <div class="p-4 d-flex">
      <div class="col-11 text-center">
          <h1>Digital System Guide</h1>
      </div>

      <div class="col-1 float-right">
        <router-link to="/manage-guide-video"><b-icon icon="gear-fill" font-scale="2" variant="secondary"></b-icon></router-link>
      </div>
    </div>
    <div style="clear:both"></div>
      <div class="m-3 d-flex">
        <p class="p-3" style="font-size: 20px">Program</p>

        <input class="form-control border input mb-3" type="search" value="Booking Creation (ESM_BKG_0079)">
        <button type="button" class="btn btn-secondary mb-3" style="    margin-left: 10px; padding-left: 30px; padding-right: 30px;">Search</button>
      </div>

      <div class="mt-3">
        <div class="container d-flex p-3 card-custom">
          <div class="col-10">
          <h2>How to create a new Booking</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea quibusdam ab odit amet et! Accusantium tenetur</p>
        </div>
        <div class="col-2 text-center">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        </div>
        <div class="container d-flex p-3 card-custom">
          <div class="col-10">
          <h2>Make a new B/L</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea quibusdam ab odit amet et! Accusantium tenetur</p>
        </div>
        <div class="col-2 text-center">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
        </div>
        </div>
        <div class="container d-flex p-3 card-custom">
          <div class="col-10">
          <h2>How to call to customer ?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea quibusdam ab odit amet et! Accusantium tenetur</p>
        </div>
        <div class="col-2 text-center">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star "></span>
          <span class="fa fa-star"></span>
        </div>
        </div>
        <div class="container d-flex p-3 card-custom">
          <div class="col-10">
          <h2>How to delete Booking ?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea quibusdam ab odit amet et! Accusantium tenetur</p>
        </div>
        <div class="col-2 text-center">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
        </div>
        </div>
      </div>
     <div class="mt-3 p-5"></div>
</div>
</template>

<script>

export default {
  name: 'CompoMain',
  components: {

  }
}
</script>

<style>
.checked {
  color: rgb(158, 3, 145);
}
.card-custom{
  background-color: rgb(49,49,49);
  border-radius: 10px;
  margin-top: 20px
}
.card-custom p{
  color: gray;
}
.card-custom h2{
  font-weight: bold;
}
.card-custom:hover{
  background-color: whitesmoke;
  color: black;
  transition: background-color 0.5s;
    -webkit-transition: background-color 0.5s;
    -moz-transition: background-color 0.5s;
    -ms-transition: background-color 0.5s;
    -o-transition: background-color 0.5s;
}
</style>
