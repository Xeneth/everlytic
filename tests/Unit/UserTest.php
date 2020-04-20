<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    /**
     * Test Get All Users Endpoint
     *
     * @return void
     */
    public function testGetAllUsersView()
    {
        $response = $this->json('GET', '/');
        $response->assertStatus(200);

        $response->assertViewHas('users');
    }

    /**
     * Test Create User Endpoint
     *
     * @return void
     */
    public function testCreateUser()
    {
        $data = [
            'name' => "John",
            'surname' => "Doe",
            'position' => 'CEO',
            'email' => 'test@email.com'
        ];
        $response = $this->json('POST', '/store',$data);
        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        $response->assertJson(['message' => "User Create Success"]);
    }

    /**
     * Test Get All Users Endpoint
     *
     * @return void
     */
    public function testDeleteUser()
    {
        $response = $this->json('GET', '/');
        $response->assertStatus(200);
        $user = $response->getOriginalContent()->getData();

        $delete = $this->json('POST', '/destroy',array('id' => $user['users'][0]['id']));
        $delete->assertStatus(200);
        $delete->assertJson(['success' => true]);
        $delete->assertJson(['message' => "User Delete Success"]);
    }
}
