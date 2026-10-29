<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



use App\Http\Controllers\BookingController;

Route::post('/search-tutors', [BookingController::class, 'search']);
Route::post('/book-slot', [BookingController::class, 'book']);
