<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\UserRepositoryInterface;
use Validator;

class UserController extends Controller
{
    protected $user;

    /**
     * UsersController constructor.
     *
     * @param UserRepositoryInterface $user
     */
    public function __construct(UserRepositoryInterface $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data = [
            'users' => $this->user->all()
        ];

        return view('users', $data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        $data = [
            'users' => $this->user->all()
        ];

        return response()->json(['success' => 'true','data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'position' => 'required|max:255',
            'email' => 'required|email|unique:users',
        ]);

        if ($validator->passes()) {
            $this->user->create($request->all());

            return response()->json(['success' => 'true','message' => 'User Create Success']);
        }

        return response()->json(['success' => 'false','message' => 'User Create Error','errors'=>$validator->errors()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->passes()) {
            $this->user->delete($request->id);

            return response()->json(['success' => 'true','message' => 'User Delete Success']);
        }

        return response()->json(['success' => 'false','message' => 'User Delete Error','errors'=>$validator->errors()]);
    }
}
