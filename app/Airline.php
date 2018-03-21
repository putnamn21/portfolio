<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airline extends Model
{
    public $timestamps = false;

    public function flight()
    {
        return $this->hasMany('App\Flight');
    }
}
