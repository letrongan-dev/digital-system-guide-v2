<template>
<div class="container border-pink" style="background-color: rgb(31, 30, 30);">
<div class="p-4 text-center">
      <h1>Manage Guide Video</h1>
</div>
<div class="pt-4 pb-4 mb-3 condition-filter">
  <div class="d-flex p-3">
    <div class="col-4">
      <div>
          <span style="padding-right: 10px">Program Name</span>
          <input class="input">
      </div>
      <div class="mt-3">
          <span style="padding-right: 57px">Clip Title</span>
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
          <input class="input input-date" type ="date" placeholder="yyyy-mm-dd" v-model="startDate"> - <input type ="date" class="input input-date" v-model="endDate" @change="checkDate">
      </div>
    </div>
    <div class="col-4" style="margin-left: 40px">
      <span style="padding-right: 10px">Publisher</span>
      <input class="input">
      <div class="mt-3">
        <input type="checkbox"/>
        <span class="m-2" style="font-size: 18px">Hide response completed</span>
      </div>
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
    <select class="dropdown">
      <option>Recent</option>
      <option>Recent</option>
      <option>Recent</option>
    </select>
  </div>
  <div class="col-10">
    <div style="float: right">
      <button class="btn button-crud" @click="showPopup = true, itemSelected = '', file=''">Add</button>
      <button class="btn button-crud" @click="deleteHandel">Delete</button>
    </div>
  </div>
</div>

<div class="mt-3">
    <div class="table tableFixHead">
      <table class="table table-bordered">
        <thead class="text-center" style="background-color: rgb(65, 6, 55)">
          <tr>
            <th scope="col" style="width: 3%;"><input type="checkbox"  /></th>
            <th scope="col" style="width: 12%;">Date / Publisher</th>
            <th scope="col" style="width: 15%;">Program</th>
            <th scope="col" style="width: 18%;">Filename</th>
            <th scope="col" style="width: 15%;">Process Map</th>
            <th scope="col" style="width: 30%;">Clip Title/ Description</th>
            <th scope="col" style="width: 14%;">Response</th>
          </tr>
        </thead>
        <tbody>
          <tr class="body-table" v-for="(item, index) in items" :key="index" :id='(item.programId)'>
            <td class="text-center"><input type="checkbox" @change="item.isSelected = !item.isSelected"></td>
            <td ><div >{{format(item.date)}}</div>
                <div style="color: grey">{{item.user}}</div>
            </td>
            <td ><div>{{item.program}}</div>
                <div style="color: grey">{{item.programUI}}</div>
            </td>
            <td >
              <div class="d-flex">
                <b-icon icon="play-circle" font-scale="2"></b-icon>
                <span style="margin-left: 10px">{{item.fileName}}</span>
              </div>
            </td>
            <td v-b-tooltip.hover.bottom.v-secondary :title=item.processMap>
              <span class="text-line-overflow">{{item.processMap}}</span>
            </td>
            <td class="process-map" @dblclick="selectedRow(item)">
              <div>{{item.title}}</div>
              <div class="text-overflow" style="color: grey">{{item.description}}</div>
            </td>
            <td>
              <div class="d-flex">
              <span class="rating-score">{{ item.ratingScore }}</span>
              <star-rating
                        style="margin-bottom: 6px"
                        v-bind:increment="0.5"
                        v-bind:max-rating="5"
                        v-bind:rating= "parseFloat(item.ratingScore)"
                        inactive-color="grey"
                        active-color="#F1087C"
                        v-bind:star-size="20"
                        :read-only="true">
              </star-rating>
              </div>
              <div class="vote">{{item.vote}} vote / {{item.resp}} res</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
<!-- Modal Add&Edit -->
<b-modal v-model="showPopup" id="modal-add-edit" content-class="modal-custom" size="lg" ref="modal">
  <div>
    <div class="d-flex">
      <span style="width: 170px">Program ID</span>
      <input class="input form-control" type="text" v-if="itemSelected!=''"
       v-model="itemSelected.programUI">
      <input class="input form-control" type="text" value="ESM_BKG_0079" v-else>
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Program Name</span>
      <input class="input form-control" type="text" v-if="itemSelected!=''" v-model="itemSelected.program">
      <input class="input form-control" type="text" value="Booking Creation" v-else>
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Clip title</span>
      <input class="input form-control" type="text" v-if="itemSelected!=''" v-model="itemSelected.title">
      <input class="input form-control" type="text" v-else>
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Clip Description</span>
      <textarea class="input form-control" type="text" style="resize:none; height: 150px" v-if="itemSelected!=''" v-model="itemSelected.description"></textarea>
      <textarea class="input form-control" type="text" style="resize:none; height: 150px" v-else></textarea>
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Process Map</span>
      <input class="input form-control" type="text" v-if="itemSelected!=''" v-model="itemSelected.processMap">
      <input class="input form-control" type="text" v-else>
    </div>
    <div class="mt-3">
      <div class="d-flex">
          <span style="width: 190px;">File</span>
          <span class="file-box p-2" id="showFile" v-if="itemSelected!=''">{{ itemSelected.fileName }}</span>
          <span class="file-box p-2" id="showFile" v-else>Choose File ...</span>
            <input type="file" id="file" class="inputFile" v-on:change="uploadFile($event), previewVideo()" accept="video/mp4,video/x-m4v,video/*">
            <label for="file" class="mt-2">
              <span class="file-button">
                Select
              </span>
            </label>
      </div>
      <div class="d-flex mt-3" style="margin-left: 140px">
        <div v-if="file!='' || itemSelected!=''">
          <div @click="previewVideo()" style="cursor: pointer">
            <b-icon icon="play-circle" font-scale="1"></b-icon>
            <span style="margin-left: 10px">Video preview</span>
          </div>
          <div style="margin-left: 40px">
            <video id="video-preview" controls style="display: none"/>
          </div>
        </div>
        <div style="opacity : 0.5; cursor: default" v-else>
            <b-icon icon="play-circle" font-scale="1"></b-icon>
            <span style="margin-left: 10px">Video preview</span>
        </div>
      </div>
    </div>
    <div class="d-flex mt-3">
      <span style="width: 170px">Publisher / Date</span>
      <div class="file-box p-2 d-flex" v-if="itemSelected != ''">
        <span>{{itemSelected.user}} | </span>
        <span style="margin-left: 5px">{{format(itemSelected.date)}}</span>
      </div>
      <div class="file-box p-2 d-flex" v-else>
        <span>losokim | </span>
        <span></span>
      </div>
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
 <div class="mt-3 p-5"></div>
</div>
</template>

<script>
import {data} from '../dataSource'
import moment from 'moment'
import StarRating from 'vue-star-rating'
export default {
  components: {
    StarRating
  },
  data () {
    return {
      items: data.map(item => ({...item, isSelected: false})),
      itemSelected: '',
      showPopup: false,
      startDate: '2022-01-01',
      endDate: '',
      file: [],
      hidden: false
    }
  },
  methods: {
    closeModal () {
      this.file = ''
      this.$refs.modal.hide()
      document.querySelectorAll('.close').forEach(item => {
        item.addEventListener('click', event => {
          this.showPopup = false
        })
      })
    },
    uploadFile (e) {
      document.getElementById('showFile').innerHTML = e.target.files[0].name
      this.file = e.target.files[0]
      // this.itemSelected.file = this.file
    },
    selectedRow (item) {
      this.itemSelected = item
      this.showPopup = true
      this.file = ''
    },
    format (value) {
      return moment(value).format('YYYY.MM.DD HH:MM')
    },
    checkDate () {
      if (Date.parse(this.endDate) <= Date.parse(this.startDate)) {
        alert('End date should be greater than Start date')
        this.endDate = ''
      }
    },
    previewVideo () {
      this.hidden = !this.hidden
      if (this.hidden === false) {
        document.getElementById('video-preview').style.display = 'block'
        let video = document.getElementById('video-preview')
        let reader = new FileReader()

        if (this.itemSelected !== '') {
          video.src = require('@/assets/' + this.itemSelected.fileName)
        } else {
          reader.readAsDataURL(this.file)
          reader.addEventListener('load', function () {
            video.src = reader.result
          })
        }
      } else {
        document.getElementById('video-preview').style.display = 'none'
      }
    },
    deleteHandel () {
      let msg = 'Do you want delete rows ?'
      let arrDel = this.items.filter(item => item.isSelected)
      if (confirm(msg) === true && arrDel.length !== 0) {
        this.items = this.items.filter(item => !item.isSelected)
        console.log(arrDel)
        alert('Deleted successfully !')
      } else {
        alert('No element delete !')
      }
    },
    searchHandel () {
      this.items = data.map(item => ({...item, isSelected: false}))
    }
  },
  computed: {

  }
}
</script>

<style>
#video-preview{
  height: 300px;
  width: auto;
  margin-top: 30px;
}
.vote{
 color: grey;
 margin-left: 15px
}
.vue-star-rating-rating-text{
    display: none;
}
.rating-score{
  margin-right: 10px;
  font-size: 20px;
}
.condition-filter{
  background-color: rgb(49, 49, 49);
  border-radius: 8px;
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
  table-layout: fixed;
  width: 100%;
}

.text-overflow {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-line-overflow{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tableFixHead{
  overflow: auto;
  height: 400px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: rgb(110, 39, 98)
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
.body-table:hover{
  cursor: pointer;
  background-color: rgba(230, 224, 230, 0.952);
  color: black;
  transition: background-color .5s;
    -webkit-transition: background-color .5s;
    -moz-transition: background-color .5s;
    -ms-transition: background-color .5s;
    -o-transition: background-color .5s;
}
.dropdown{
  padding: 10px;
  background: rgb(31,30,30);
  border: none;
  color: white;
}
</style>
