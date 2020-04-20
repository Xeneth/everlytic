<?php
namespace App\Repositories;

use App\User;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Get a user by ID
     *
     * @param int
     * @return collection
     */
    public function get($user_id)
    {
        return User::find($user_id);
    }

    /**
     * Get all users.
     *
     * @return mixed
     */
    public function all()
    {
        return User::all();
    }

    /**
     * Creates a user.
     *
     * @param array
     */
    public function create(array $post_data)
    {
        User::create($post_data);
    }
    
    /**
     * Deletes a user.
     *
     * @param int
     */
    public function delete($user_id)
    {
        User::destroy($user_id);
    }
}
