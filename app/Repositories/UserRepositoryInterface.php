<?php

namespace App\Repositories;

interface UserRepositoryInterface
{
    /**
     * Get a user by ID
     *
     * @param int
     */
    public function get($user_id);

    /**
     * Get all users.
     *
     * @return mixed
     */
    public function all();

    /**
     * Creates a user.
     *
     * @param array
     */
    public function create(array $user_data);

    /**
     * Deletes a user.
     *
     * @param int
     */
    public function delete($user_id);

}
