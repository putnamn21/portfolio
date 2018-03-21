<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    public $timestamps = false;

    public function airline()
    {
        return $this->belongsTo('App\Airline');
    }

    public function sourceAirport()
    {
        return $this->belongsTo('App\Airport', 'source_airport_id');
    }
    public function destinationAirport()
    {
        return $this->belongsTo('App\Airport', 'destination_airport_id');
    }
}
