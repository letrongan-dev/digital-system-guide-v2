<template>
<article>
<div class="p-4 text-center">
      <h1>Manage Guide Video</h1>
</div>
<div class="pt-4 pb-4 mb-3 condition-filter">
  <div class="d-flex p-1">
    <div class="col-4">
      <div>
          <span style="padding-right: 10px">Program Name</span>
          <input class="input">
      </div>
      <div class="mt-3">
          <span style="padding-right: 55px">Clip Title</span>
          <input class="input">
      </div>
    </div>
    <div class="col-4">
      <div>
        <span style="padding-right: 10px">Program</span>
        <input class="input" size="31px">
      </div>
      <div class="mt-3">
          <span style="padding-right: 25px">Period</span>
          <input class="input input-date" value="2022.01.01" placeholder="yyyy-mm-dd"> - <input type ="date" class="input input-date">
      </div>
    </div>
    <div class="col-4" style="margin-left: 40px">
      <span style="padding-right: 10px">Publisher</span>
      <input class="input">
      <div class="mt-3">Today</div>
    </div>
  </div>
  <div class="d-flex button-reload-search">
      <div class="btn btn-secondary" style="border-radius: 50%"><b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon></div>
      <div class="btn btn-secondary" style="border-radius: 20px;padding-left:20px; padding-right: 20px; margin-left:5px">Search</div>
    </div>
</div>
  <div style="clear:both"></div>
<div class="d-flex mt-5">
  <div class="col-2">
    Recent
  </div>
  <div class="col-10">
    <div style="float: right">
      <button class="btn button-crud">Edit</button>
      <button class="btn button-crud" v-b-modal.modal-add>Add</button>
      <button class="btn button-crud">Delete</button>
      <button class="btn button-crud" v-b-modal.modal-email>Email</button>
    </div>
  </div>
</div>

<div class="mt-3">
    <div class="table tableFixHead">
      <table class="table table-bordered">
        <thead style="background-color: rgb(65, 6, 55)">
          <tr class="text-center">
            <th scope="col" style="width: 50px"><input type="checkbox" v-model="selectAll" @click="select()"/></th>
            <th scope="col" style="width: 180px">Date / Publisher</th>
            <th scope="col" style="width: 180px">Program</th>
            <th scope="col" style="width: 230px">Filename</th>
            <th scope="col">Clip Title/ Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td class="text-center"><input type="checkbox" v-model="selected" @change='updateCheckAll()' :value="item"/></td>
            <td><div>{{item.date}}</div>
                <div style="color: grey">{{item.user}}</div>
            </td>
            <td><div>{{item.program}}</div>
                <div style="color: grey">{{item.programUI}}</div>
            </td>
            <td>
              <div class="d-flex">
                <b-icon icon="play-circle" font-scale="2"></b-icon>
                <span style="margin-left: 10px">{{item.fileName}}</span>
              </div>
            </td>
            <td>
              <div>{{item.title}}</div>
              <div style="color: grey">{{item.description}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
<!-- Modal Add -->
<b-modal id="modal-add" content-class="modal-custom" size="lg" ref="modalAdd">
  <div>
    <div class="d-flex">
      <span style="width: 170px">Program ID</span>
      <input class="input form-control" type="text" value="ESM_BKG_0079">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Program Name</span>
      <input class="input form-control" type="text" value="Booking Creation">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Clip title</span>
      <input class="input form-control" type="text">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Clip Description</span>
      <textarea class="input form-control" type="text" style="resize:none"></textarea>
    </div>
    <div class="mt-3">
      <div class="d-flex">
          <span style="width: 190px;">File</span>
          <span class="file-box p-2" id="showFile"></span>
            <input type="file" id="file" class="inputFile" v-on:change="uploadFile($event)" accept="video/mp4,video/x-m4v,video/*">
            <label for="file" class="mt-2">
              <span class="file-button">
                Select
              </span>
            </label>
      </div>
      <div class="d-flex mt-3" style="margin-left: 140px">
        <b-icon icon="play-circle" font-scale="2"></b-icon>
        <span style="margin-left: 10px">Video preview</span>
      </div>
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Publisher</span>
      <input class="input form-control" type="text" value="losokim">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Date</span>
      <input class="input form-control" type="date">
    </div>
  </div>
  <template #modal-footer>
    <div class="w-100">
      <b-button style="float: left">Delete</b-button>
      <b-button style="float: right; margin-left: 10px; font-weight: bold">
        Save
      </b-button>
      <b-button style="float: right" @click="closeModal">Cancel</b-button>
    </div>
  </template>
</b-modal>
<!-- Modal Email -->
<b-modal id="modal-email" content-class="modal-custom" size="lg" ref="modal">
  <div>
    <div class="d-flex">
      <span style="width: 170px">Title</span>
      <input class="input form-control" type="text" value="Notify the updated Video">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">To</span>
      <input class="input form-control" type="text" value="one@one.com, swebris@clt.com">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">CC</span>
      <input class="input form-control" type="text">
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Message</span>
      <textarea class="input form-control" type="text" style="resize:none; height: 500px"></textarea>
    </div>
  </div>
  <template #modal-footer>
    <div class="w-100">
      <b-button style="float: right; margin-left: 10px; font-weight: bold">
        Send
      </b-button>
      <b-button style="float: right" @click="closeModal">Cancel</b-button>
    </div>
  </template>
</b-modal>
<CompFooter/>
</article>
</template>

<script>
import CompFooter from '../components/ComponentFooter.vue'
import {data} from '../dataSource'
export default {
  components: {
    CompFooter
  },
  data () {
    return {
      items: data,
      selected: [],
      selectAll: false
    }
  },
  methods: {
    closeModal () {
      this.$refs.modal.hide()
    },
    select () {
      this.selected = []
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i])
        }
      }
    },
    updateCheckAll () {
      if (this.items.length === this.selected.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    uploadFile (e) {
      document.getElementById('showFile').innerHTML = e.target.files[0].name
    }
  },
  computed: {
    visibleFields () {
      return this.fields.filter(field => field.visible)
    }
  }
}
</script>

<style>
.condition-filter{
  background-color: rgb(49, 49, 49);
   border-radius: 4px;
   color: white;
   position: relative;
}
.input-date{
  width: 137px;
}
.button-reload-search{
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(50%);
  float: right;
  margin-right: 20px
}
.button-crud{
  border: 1px solid white;
  background-color: rgb(49, 49, 49);
  border-radius: 4px;
  -moz-border-radius: 4px;
  color: white;
}
.table{
  color: white;
  border-color: rgb(80, 79, 79);
}
.tableFixHead{
  overflow: auto;
  height: 400px;
}
.tableFixHead thead th {
   position: sticky;
   top: 0;
   z-index: 1;
   background-color: rgba(126, 7, 106, 0.966)
}
.modal-custom{
  background-color: rgb(49, 49, 49);
  color: white;
}
input[type=checkbox] {
    transform: scale(1.5);
}
.btn:hover{
  background-color: whitesmoke;
  color: black;
  font-weight: bold;
  transition: background-color .5s;
    -webkit-transition: background-color .5s;
    -moz-transition: background-color .5s;
    -ms-transition: background-color .5s;
    -o-transition: background-color .5s;
}
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.inputFile {
  display: none;
}

.file-button {
  background: grey;
  border-radius: 5px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
}

.file-box {
  display: inline-block;
  width: 100%;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 5px;
  background: #555;
}
.close{
  background-color: #313131;
  color: white;
  border: none;
  font-size: 30px
}
</style>
