<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    public function getLocation($city, $state = null, $country = null, $limit = 1)
    {
        $query = $city;
        if ($state) $query .= ',' . $state;
        if ($country) $query .= ',' . $country;

        $response = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $query,
            'limit' => $limit,
            'appid' => config('services.openweather.key'),
        ]);

        return $response->json();
    }
}
