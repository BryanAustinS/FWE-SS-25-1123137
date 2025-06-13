/* tslint:disable */
/* eslint-disable */
/**
 * Trip Planner API
 * API for managing trips
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TripInput
 */
export interface TripInput {
    /**
     * 
     * @type {string}
     * @memberof TripInput
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof TripInput
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof TripInput
     */
    startDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof TripInput
     */
    endDate: Date;
    /**
     * 
     * @type {number}
     * @memberof TripInput
     */
    participants: number;
    /**
     * 
     * @type {string}
     * @memberof TripInput
     */
    imageUrl?: string | null;
}

/**
 * Check if a given object implements the TripInput interface.
 */
export function instanceOfTripInput(value: object): value is TripInput {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('startDate' in value) || value['startDate'] === undefined) return false;
    if (!('endDate' in value) || value['endDate'] === undefined) return false;
    if (!('participants' in value) || value['participants'] === undefined) return false;
    return true;
}

export function TripInputFromJSON(json: any): TripInput {
    return TripInputFromJSONTyped(json, false);
}

export function TripInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): TripInput {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'] == null ? undefined : json['description'],
        'startDate': (new Date(json['startDate'])),
        'endDate': (new Date(json['endDate'])),
        'participants': json['participants'],
        'imageUrl': json['imageUrl'] == null ? undefined : json['imageUrl'],
    };
}

export function TripInputToJSON(json: any): TripInput {
    return TripInputToJSONTyped(json, false);
}

export function TripInputToJSONTyped(value?: TripInput | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
        'startDate': ((value['startDate']).toISOString()),
        'endDate': ((value['endDate']).toISOString()),
        'participants': value['participants'],
        'imageUrl': value['imageUrl'],
    };
}

