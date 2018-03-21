<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    public $timestamps = false;

    public function outboundFlights()
    {
        return $this->hasMany('App\Flight', 'source_airport_id');
    }
    public function inboundFlights()
    {
        return $this->hasMany('App\Flight', 'destination_airport_id');
    }
}
