<!--
    Props:
        items: Array,
        fields: Array,
        features: Array,
        title: String,
        filter: Boolean,
        pagination: Boolean
 -->
<template>
    <div>
        <h3 class="text-center">{{titleDisplay}}</h3>
        <b-button v-if="onAdd" size="md" @click="addItem" class="float-right mb-2 mt-2" variant="success">Add</b-button>
        <b-table id="table" :sort-by.sync="sortBy" :fields="displayFields" show-empty responsive striped outlined hover :items="list" :per-page="perPage" :current-page="currentPage" :filter="search">
            <template v-slot:cell(actions)="row">
                <b-button v-if="onView" size="sm" @click="viewItem(row.item.id)" variant="primary">View</b-button>
                <b-button v-if="onEdit" size="sm" @click="editItem(row.item.id)" variant="success" class="mr-1">Edit</b-button>
                <b-button v-if="onDelete" size="sm" @click="showDeleteModal(row.item.id)" variant="danger">Delete</b-button>
            </template>
        </b-table>
        <b-pagination
        v-if="paginationActive"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="table"
        align="center"
        ></b-pagination>

    </div>
</template>

<script>
export default {
    name:'ManageTable',
    computed: {
        rows(){
            return this.list.length;
        },
        sortOptions(){
            return this.displayFields.filter((item) => item.sortable).map((item) => { return {text: item.label, value: item.value}});
        }
    },
    data(){
        return {
            titleDisplay: "",
            list: [],
            displayFields: [],
            onAdd: false,
            onEdit: false,
            onDelete: false,
            onView: false,
            perPage: 10,
            currentPage: 1,
            search: "",
            filterActive: false,
            paginationActive: false,
            sortBy: ""
        }
    },
    methods: {
        editItem(id){
            this.$emit('edit',id);
        },
        deleteItem(id){
            this.$emit('delete',id);
        },
        viewItem(id){
            this.$emit('view',id);
        },
        addItem(){
            this.$emit('add');
        },
        showDeleteModal(id){
            this.$bvModal.msgBoxConfirm(`Do you really want to delete this item?`, {
                title: 'Delete',
                size: 'sm',
                buttonSize: 'md',
                okVariant: 'danger',
                cancelTitle: 'Cancel',
                okTitle: 'Delete',
                autoFocusButton: 'ok',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
                })
                .then(value => {
                    if(value)
                        this.deleteItem(id);
                })
            }
        },
    props:{
        items: Array,
        fields: Array,
        features: Array,
        title: String,
        filter: Boolean,
        pagination: Boolean
    },
    watch: {
        '$props.items': function(items){
            this.list = items;
        }
    },
    mounted(){
        if(this.$props.items)
            this.list = this.$props.items;
        if(this.$props.fields)
            this.displayFields = this.$props.fields;
        if(this.$props.title)
            this.titleDisplay = this.$props.title;
        if(this.$props.filter)
            this.filterActive = true;
        if(this.$props.pagination)
            this.paginationActive = true;
        if(this.$props.features){
            const features = this.$props.features;
            if(features.includes('edit'))
                this.onEdit = true;
            if(features.includes('add'))
                this.onAdd = true;
            if(features.includes('delete'))
                this.onDelete = true;
            if(features.includes('view'))
                this.onView = true;
        }

    }
}
</script>

<style scoped>
.filterContainer{
    padding:2% 0 2% 0;
}
.pull-right{
    float:right !important
}
</style>