@extends('layouts.app')

@section('content')

    <!-- Page Content -->
    <div class="content">
        <div class="addUserBtn"><input type="submit" class="addBtn" value="Add User"></div>
        <table id="usersTable">
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->name }} {{ $user->surname }}</td>
                    <td>{{ $user->position }}</td>
                    <td>{{ $user->email }}</td>
                    <td><a class="deleteBtn" id="{{ $user->id }}"><i class="fa fa-trash" style="color:#FF0000; cursor: pointer;"></i></a></td>
                </tr>
            @endforeach
        </table>
    </div>

    <!-- MODALS -->
    <!-- Delete Modal -->
    <div id="deleteModal" class="modal">

        <!-- Delete Modal Content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Confirm Delete</h3>
            Are you sure you want to delete this user?
            <div class="loader">
                <i class="fa fa-3x fa-spinner"></i>
            </div>
            <div class="success"></div>
            <div class="errors">
                <ul></ul>
            </div>
            <input type="submit" class="confirmBtn" value="Confirm">
        </div>
    </div>

    <!-- Add Modal -->
    <div id="addModal" class="modal">

        <!-- Add Modal Content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Add User</h3>
            <div class="loader">
                <i class="fa fa-3x fa-spinner"></i>
            </div>
            <div class="success"></div>
            <div class="errors">
                <ul></ul>
            </div>
            <form name="addUserForm" id="addUserForm" method="post" action="{{ url('/store') }}">
                <input name="_token" value="{{ csrf_token() }}" type="hidden">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name..">

                <label for="surname">Surname</label>
                <input type="text" id="surname" name="surname" placeholder="Your surname..">

                <label for="position">Position</label>
                <input type="text" id="position" name="position" placeholder="Your position..">

                <label for="email">Email Address</label>
                <input type="text" id="email" name="email" placeholder="Your email address..">

                <input type="submit" class="saveBtn" value="Save">
            </form>
            {{--<span class="confirm"><button class="cancelBtn">Cancel</button><button class="saveBtn">Save</button></span>--}}
        </div>
    </div>
@endsection
