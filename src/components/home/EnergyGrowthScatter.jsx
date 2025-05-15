'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

// Mock data for Energy Access vs Human Development Index
const mockData = [{'country': 'Afghanistan', 'energyAccess': 85.3, 'hdi': 0.496, 'extreme_poverty':NaN, 'region': 'Asia', 'population': 40.6},
  {'country': 'Albania', 'energyAccess': 100.0, 'hdi': 0.81, 'extreme_poverty': 0.021277364, 'region': 'Europe', 'population': 2.8}, {'country': 'Algeria', 'energyAccess': 100.0, 'hdi': 0.763, 'extreme_poverty': 0.0, 'region': 'Africa', 'population': 45.5}, {'country': 'Angola', 'energyAccess': 48.5, 'hdi': 0.616, 'extreme_poverty': 31.122005, 'region': 'Africa', 'population': 35.6}, {'country': 'Antigua and Barbuda', 'energyAccess': 100.0, 'hdi': 0.851, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, {'country': 'Argentina', 'energyAccess': 100.0, 'hdi': 0.865, 'extreme_poverty':NaN, 'region': 'South America', 'population': 45.4}, {'country': 'Armenia', 'energyAccess': 100.0, 'hdi': 0.811, 'extreme_poverty': 0.7810783, 'region': 'Asia', 'population': 2.9}, {'country': 'Aruba', 'energyAccess': 99.9, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, {'country': 'Australia', 'energyAccess': 100.0, 'hdi': 0.958, 'extreme_poverty': 0.49709398, 'region': 'Oceania', 'population': 26.2}, {'country': 'Austria', 'energyAccess': 100.0, 'hdi': 0.93, 'extreme_poverty': 0.4858222, 'region': 'Europe', 'population': 9.1}, {'country': 'Azerbaijan', 'energyAccess': 100.0, 'hdi': 0.789, 'extreme_poverty': 0.0, 'region': 'Asia', 'population': 10.3}, {'country': 'Bahrain', 'energyAccess': 100.0, 'hdi': 0.899, 'extreme_poverty':NaN, 'region': 'Middle East', 'population': 1.5}, {'country': 'Bangladesh', 'energyAccess': 99.4, 'hdi': 0.685, 'extreme_poverty': 5.008496, 'region': 'Asia', 'population': 169.4}, {'country': 'Barbados', 'energyAccess': 100.0, 'hdi': 0.811, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.3}, {'country': 'Belarus', 'energyAccess': 100.0, 'hdi': 0.824, 'extreme_poverty': 0.0, 'region': 'Europe', 'population': 9.2}, {'country': 'Belgium', 'energyAccess': 100.0, 'hdi': 0.951, 'extreme_poverty': 0.02996537, 'region': 'Europe', 'population': 11.6}, {'country': 'Belize', 'energyAccess': 98.6, 'hdi': 0.721, 'extreme_poverty': 19.556927, 'region': 'North America', 'population': 0.4}, {'country': 'Benin', 'energyAccess': 56.5, 'hdi': 0.515, 'extreme_poverty': 12.723279, 'region': 'Africa', 'population': 13.8}, {'country': 'Bermuda', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, {'country': 'Bhutan', 'energyAccess': 100.0, 'hdi': 0.698, 'extreme_poverty': 0.0015388478, 'region': 'Asia', 'population': 0.8}, {'country': 'Bolivia', 'energyAccess': 99.9, 'hdi':NaN, 'extreme_poverty': 1.9645011, 'region': 'South America', 'population': 12.1}, {'country': 'Bosnia and Herzegovina', 'energyAccess': 100.0, 'hdi': 0.804, 'extreme_poverty': 0.074978754, 'region': 'Europe', 'population': 3.2}, {'country': 'Botswana', 'energyAccess': 75.9, 'hdi': 0.731, 'extreme_poverty': 15.426243, 'region': 'Africa', 'population': 2.4},
  {'country': 'Brazil', 'energyAccess': 100.0, 'hdi': 0.786, 'extreme_poverty': 3.5053015, 'region': 'South America', 'population': 210.3}, {'country': 'Brunei', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Asia', 'population': 0.5}, {'country': 'Bulgaria', 'energyAccess': 100.0, 'hdi': 0.845, 'extreme_poverty': 0.69914126, 'region': 'Europe', 'population': 6.8}, {'country': 'Burkina Faso', 'energyAccess': 19.5, 'hdi': 0.459, 'extreme_poverty': 25.277073, 'region': 'Africa', 'population': 22.5}, {'country': 'Burundi', 'energyAccess': 10.3, 'hdi': 0.439, 'extreme_poverty': 62.06576, 'region': 'Africa', 'population': 13.3}, {'country': 'Cambodia', 'energyAccess': 92.3, 'hdi': 0.606, 'extreme_poverty':NaN, 'region': 'Asia', 'population': 17.2}, {'country': 'Cameroon', 'energyAccess': 71.0, 'hdi': 0.588, 'extreme_poverty': 22.99222, 'region': 'Africa', 'population': 27.6}, {'country': 'Canada', 'energyAccess': 100.0, 'hdi': 0.939, 'extreme_poverty': 0.24863754, 'region': 'North America', 'population': 38.8}, {'country': 'Cape Verde', 'energyAccess': 97.1, 'hdi':NaN, 'extreme_poverty': 4.5642314, 'region': 'Africa', 'population': 0.5}, 
  {'country': 'Cayman Islands', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, 
  {'country': 'Central African Republic', 'energyAccess': 15.7, 'hdi': 0.414, 'extreme_poverty': 65.66651, 'region': 'Africa', 'population': 5.1}, {'country': 'Chad', 'energyAccess': 11.7, 'hdi': 0.416, 'extreme_poverty': 30.845234, 'region': 'Africa', 'population': 18.5}, {'country': 'Chile', 'energyAccess': 100.0, 'hdi': 0.878, 'extreme_poverty': 0.39505082, 'region': 'South America', 'population': 19.6}, {'country': 'China', 'energyAccess': 100.0, 'hdi': 0.797, 'extreme_poverty': 0.0, 'region': 'Asia', 'population': 1425.2}, {'country': 'Colombia', 'energyAccess': 100.0, 'hdi': 0.788, 'extreme_poverty': 6.036548, 'region': 'South America', 'population': 51.7}, 
  {'country': 'Comoros', 'energyAccess': 89.9, 'hdi': 0.603, 'extreme_poverty': 18.643723, 'region': 'Africa', 'population': 0.8}, {'country': 'Congo', 'energyAccess': 50.6, 'hdi': 0.649, 'extreme_poverty': 35.357456, 'region': 'Africa', 'population': 6.0}, {'country': 'Costa Rica', 'energyAccess': 100.0, 'hdi': 0.833, 'extreme_poverty': 0.88261974, 'region': 'North America', 'population': 5.1}, {'country': 'Croatia', 'energyAccess': 100.0, 'hdi': 0.889, 'extreme_poverty': 0.3080042, 'region': 'Europe', 'population': 3.9}, {'country': 'Cuba', 'energyAccess': 100.0, 'hdi': 0.762, 'extreme_poverty':NaN, 'region': 'North America', 'population': 11.1}, {'country': 'Cyprus', 'energyAccess': 100.0, 'hdi': 0.913, 'extreme_poverty': 0.0053034704, 'region': 'Europe', 'population': 1.3}, {'country': 'Czechia', 'energyAccess': 100.0, 'hdi': 0.915, 'extreme_poverty': 0.059850585, 'region': 'Europe', 'population': 10.7}, {'country': 'Democratic Republic of Congo', 'energyAccess': 21.5, 'hdi':NaN, 'extreme_poverty': 78.94202, 'region': 'Africa', 'population': 102.4}, {'country': 'Denmark', 'energyAccess': 100.0, 'hdi': 0.962, 'extreme_poverty': 0.15367964, 'region': 'Europe', 'population': 5.9}, {'country': 'Djibouti', 'energyAccess': 65.0, 'hdi': 0.513, 'extreme_poverty': 19.079206, 'region': 'Africa', 'population': 1.1}, {'country': 'Dominica', 'energyAccess': 100.0, 'hdi': 0.761, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, {'country': 'Dominican Republic', 'energyAccess': 98.1, 'hdi': 0.776, 'extreme_poverty': 0.75717556, 'region': 'North America', 'population': 11.2}, {'country': 'East Timor', 'energyAccess': 99.7, 'hdi':NaN, 'extreme_poverty': 24.443077, 'region': 'Asia', 'population': 1.4},
  {'country': 'Ecuador', 'energyAccess': 100.0, 'hdi': 0.777, 'extreme_poverty': 3.7984307, 'region': 'South America', 'population': 17.8}, {'country': 'Egypt', 'energyAccess': 100.0, 'hdi': 0.754, 'extreme_poverty': 1.4670148, 'region': 'Africa', 'population': 112.6}, {'country': 'El Salvador', 'energyAccess': 100.0, 'hdi': 0.678, 'extreme_poverty': 3.363398, 'region': 'North America', 'population': 6.3}, {'country': 'Equatorial Guinea', 'energyAccess': 67.0, 'hdi': 0.674, 'extreme_poverty':NaN, 'region': 'Africa', 'population': 1.8}, {'country': 'Eritrea', 'energyAccess': 55.4, 'hdi': 0.503, 'extreme_poverty':NaN, 'region': 'Africa', 'population': 3.4}, {'country': 'Estonia', 'energyAccess': 100.0, 'hdi': 0.905, 'extreme_poverty': 0.30924037, 'region': 'Europe', 'population': 1.4}, {'country': 'Eswatini', 'energyAccess': 82.3, 'hdi':NaN, 'extreme_poverty': 36.07985, 'region': 'Africa', 'population': 1.2}, {'country': 'Ethiopia', 'energyAccess': 55.0, 'hdi': 0.497, 'extreme_poverty': 26.984606, 'region': 'Africa', 'population': 125.4}, {'country': 'Fiji', 'energyAccess': 92.0, 'hdi': 0.731, 'extreme_poverty': 1.3182689, 'region': 'Oceania', 'population': 0.9}, {'country': 'Finland', 'energyAccess': 100.0, 'hdi': 0.948, 'extreme_poverty': 0.021342963, 'region': 'Europe', 'population': 5.6}, {'country': 'France', 'energyAccess': 100.0, 'hdi': 0.92, 'extreme_poverty': 0.056357384, 'region': 'Europe', 'population': 66.3}, {'country': 'French Polynesia', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Oceania', 'population': 0.3}, {'country': 'Gabon', 'energyAccess': 93.5, 'hdi': 0.733, 'extreme_poverty': 2.468642, 'region': 'Africa', 'population': 2.4}, {'country': 'Gambia', 'energyAccess': 65.4, 'hdi': 0.524, 'extreme_poverty': 17.242134, 'region': 'Africa', 'population': 2.6}, {'country': 'Georgia', 'energyAccess': 100.0, 'hdi': 0.844, 'extreme_poverty': 4.268949, 'region': 'Asia', 'population': 3.8}, {'country': 'Germany', 'energyAccess': 100.0, 'hdi': 0.959, 'extreme_poverty': 0.24379632, 'region': 'Europe', 'population': 84.1}, {'country': 'Ghana', 'energyAccess': 85.1, 'hdi': 0.628, 'extreme_poverty': 25.208553, 'region': 'Africa', 'population': 33.1}, {'country': 'Gibraltar', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Europe', 'population': 0.0}, {'country': 'Greece', 'energyAccess': 100.0, 'hdi': 0.908, 'extreme_poverty': 0.56709486, 'region': 'Europe', 'population': 10.4}, {'country': 'Greenland', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, {'country': 'Grenada', 'energyAccess': 94.2, 'hdi': 0.791, 'extreme_poverty': 0.31790403, 'region': 'North America', 'population': 0.1}, {'country': 'Guam', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Oceania', 'population': 0.2}, {'country': 'Guatemala', 'energyAccess': 99.1, 'hdi': 0.662, 'extreme_poverty': 9.521302, 'region': 'North America', 'population': 17.8}, {'country': 'Guinea', 'energyAccess': 47.7, 'hdi': 0.5, 'extreme_poverty': 13.8201, 'region': 'Africa', 'population': 14.1}, {'country': 'Guinea-Bissau', 'energyAccess': 37.4, 'hdi': 0.514, 'extreme_poverty': 25.962856, 'region': 'Africa', 'population': 2.1}, {'country': 'Guyana', 'energyAccess': 93.0, 'hdi': 0.776, 'extreme_poverty': 11.897037, 'region': 'South America', 'population': 0.8}, {'country': 'Haiti', 'energyAccess': 49.3, 'hdi': 0.554, 'extreme_poverty': 57.87614, 'region': 'North America', 'population': 11.5}, {'country': 'Honduras', 'energyAccess': 94.4, 'hdi': 0.645, 'extreme_poverty': 12.742991, 'region': 'North America', 'population': 10.5}, {'country': 'Hong Kong', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Asia', 'population': 7.5}, {'country': 'Hungary', 'energyAccess': 100.0, 'hdi': 0.87, 'extreme_poverty': 0.4015956, 'region': 'Europe', 'population': 9.7}, {'country': 'Iceland', 'energyAccess': 100.0, 'hdi': 0.972, 'extreme_poverty': 0.0, 'region': 'Europe', 'population': 0.4}, {'country': 'India', 'energyAccess': 99.2, 'hdi': 0.685, 'extreme_poverty': 12.917313, 'region': 'Asia', 'population': 1425.4}, {'country': 'Indonesia', 'energyAccess': 100.0, 'hdi': 0.728, 'extreme_poverty': 1.8155379, 'region': 'Asia', 'population': 278.8}, {'country': 'Iran', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.46844715, 'region': 'Middle East', 'population': 89.5}, {'country': 'Iraq', 'energyAccess': 100.0, 'hdi': 0.695, 'extreme_poverty': 0.08875247, 'region': 'Middle East', 'population': 44.1}, {'country': 'Ireland', 'energyAccess': 100.0, 'hdi': 0.949, 'extreme_poverty': 0.063545495, 'region': 'Europe', 'population': 5.1}, {'country': 'Isle of Man', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Europe', 'population': 0.1}, {'country': 'Israel', 'energyAccess': 100.0, 'hdi': 0.919, 'extreme_poverty': 0.2422214, 'region': 'Middle East', 'population': 9.1}, {'country': 'Italy', 'energyAccess': 100.0, 'hdi': 0.915, 'extreme_poverty': 0.8145304, 'region': 'Europe', 'population': 59.6}, {'country': 'Jamaica', 'energyAccess': 100.0, 'hdi': 0.72, 'extreme_poverty': 0.30976602, 'region': 'North America', 'population': 2.8}, {'country': 'Japan', 'energyAccess': 100.0, 'hdi': 0.925, 'extreme_poverty': 0.72788787, 'region': 'Asia', 'population': 125.0}, {'country': 'Jordan', 'energyAccess': 100.0, 'hdi': 0.754, 'extreme_poverty': 0.040854882, 'region': 'Middle East', 'population': 11.3}, {'country': 'Kazakhstan', 'energyAccess': 100.0, 'hdi': 0.837, 'extreme_poverty': 0.017695257, 'region': 'Asia', 'population': 20.0}, {'country': 'Kenya', 'energyAccess': 76.0, 'hdi': 0.628, 'extreme_poverty': 36.146057, 'region': 'Africa', 'population': 54.3}, {'country': 'Kiribati', 'energyAccess': 94.4, 'hdi': 0.644, 'extreme_poverty': 1.6780767, 'region': 'Oceania', 'population': 0.1}, {'country': 'Kosovo', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.4402413, 'region': 'Europe', 'population': 1.7}, {'country': 'Kuwait', 'energyAccess': 100.0, 'hdi': 0.852, 'extreme_poverty':NaN, 'region': 'Middle East', 'population': 4.6}, {'country': 'Kyrgyzstan', 'energyAccess': 99.7, 'hdi': 0.72, 'extreme_poverty': 0.31051716, 'region': 'Asia', 'population': 7.0}, {'country': 'Laos', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 7.1383624, 'region': 'Asia', 'population': 7.6}, {'country': 'Latvia', 'energyAccess': 100.0, 'hdi': 0.889, 'extreme_poverty': 0.39730492, 'region': 'Europe', 'population': 1.9}, {'country': 'Lebanon', 'energyAccess': 100.0, 'hdi': 0.752, 'extreme_poverty': 0.0, 'region': 'Middle East', 'population': 5.7}, {'country': 'Lesotho', 'energyAccess': 50.0, 'hdi': 0.55, 'extreme_poverty': 32.39991, 'region': 'Africa', 'population': 2.3}, {'country': 'Liberia', 'energyAccess': 31.8, 'hdi': 0.51, 'extreme_poverty': 27.617746, 'region': 'Africa', 'population': 5.4}, {'country': 'Libya', 'energyAccess': 70.0, 'hdi': 0.721, 'extreme_poverty':NaN, 'region': 'Africa', 'population': 7.2}, {'country': 'Liechtenstein', 'energyAccess': 100.0, 'hdi': 0.938, 'extreme_poverty':NaN, 'region': 'Europe', 'population': 0.0}, {'country': 'Lithuania', 'energyAccess': 100.0, 'hdi': 0.895, 'extreme_poverty': 0.25060093, 'region': 'Europe', 'population': 2.8}, {'country': 'Luxembourg', 'energyAccess': 100.0, 'hdi': 0.922, 'extreme_poverty': 0.050036773, 'region': 'Europe', 'population': 0.7}, {'country': 'Madagascar', 'energyAccess': 36.1, 'hdi': 0.487, 'extreme_poverty': 80.73006, 'region': 'Africa', 'population': 30.4}, {'country': 'Malawi', 'energyAccess': 14.0, 'hdi': 0.517, 'extreme_poverty': 70.0606, 'region': 'Africa', 'population': 20.6}, {'country': 'Malaysia', 'energyAccess': 100.0, 'hdi': 0.819, 'extreme_poverty': 0.0, 'region': 'Asia', 'population': 34.7}, {'country': 'Maldives', 'energyAccess': 100.0, 'hdi': 0.766, 'extreme_poverty': 0.0, 'region': 'Asia', 'population': 0.5}, {'country': 'Mali', 'energyAccess': 53.0, 'hdi': 0.419, 'extreme_poverty': 20.849255, 'region': 'Africa', 'population': 23.1}, {'country': 'Malta', 'energyAccess': 100.0, 'hdi': 0.924, 'extreme_poverty': 0.25567448, 'region': 'Europe', 'population': 0.5}, {'country': 'Marshall Islands', 'energyAccess': 100.0, 'hdi': 0.733, 'extreme_poverty': 0.85434437, 'region': 'Oceania', 'population': 0.0}, {'country': 'Mauritania', 'energyAccess': 49.0, 'hdi': 0.563, 'extreme_poverty': 5.354673, 'region': 'Africa', 'population': 4.9}, {'country': 'Mauritius', 'energyAccess': 100.0, 'hdi': 0.806, 'extreme_poverty': 0.12531371, 'region': 'Africa', 'population': 1.3}, {'country': 'Mexico', 'energyAccess': 100.0, 'hdi': 0.789, 'extreme_poverty': 1.1796793, 'region': 'North America', 'population': 128.6}, {'country': 'Micronesia (country)', 'energyAccess': 85.3, 'hdi':NaN, 'extreme_poverty': 16.028437, 'region': 'Oceania', 'population': 0.1}, {'country': 'Moldova', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.0, 'region': 'Europe', 'population': 3.0}, {'country': 'Monaco', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Europe', 'population': 0.0}, {'country': 'Mongolia', 'energyAccess': 100.0, 'hdi': 0.747, 'extreme_poverty': 0.2234101, 'region': 'Asia', 'population': 3.4}, {'country': 'Morocco', 'energyAccess': 100.0, 'hdi': 0.71, 'extreme_poverty': 1.4431101, 'region': 'Africa', 'population': 37.3}, {'country': 'Mozambique', 'energyAccess': 33.2, 'hdi': 0.493, 'extreme_poverty': 74.52835, 'region': 'Africa', 'population': 32.7}, {'country': 'Namibia', 'energyAccess': 56.2, 'hdi': 0.665, 'extreme_poverty': 15.617013, 'region': 'Africa', 'population': 2.9}, {'country': 'Nauru', 'energyAccess': 100.0, 'hdi': 0.703, 'extreme_poverty': 1.6715107, 'region': 'Oceania', 'population': 0.0}, {'country': 'Nepal', 'energyAccess': 91.3, 'hdi': 0.622, 'extreme_poverty': 0.36659858, 'region': 'Asia', 'population': 29.7}, {'country': 'Netherlands', 'energyAccess': 100.0, 'hdi': 0.955, 'extreme_poverty': 0.06971744, 'region': 'Europe', 'population': 17.9}, {'country': 'New Caledonia', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Oceania', 'population': 0.3}, {'country': 'New Zealand', 'energyAccess': 100.0, 'hdi': 0.938, 'extreme_poverty':NaN, 'region': 'Oceania', 'population': 5.1}, {'country': 'Nicaragua', 'energyAccess': 86.5, 'hdi': 0.706, 'extreme_poverty': 3.9410286, 'region': 'North America', 'population': 6.7}, {'country': 'Niger', 'energyAccess': 19.5, 'hdi': 0.419, 'extreme_poverty': 50.613815, 'region': 'Africa', 'population': 25.3}, {'country': 'Nigeria', 'energyAccess': 60.5, 'hdi': 0.56, 'extreme_poverty': 30.863297, 'region': 'Africa', 'population': 223.2}, {'country': 'North Korea', 'energyAccess': 54.7, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Asia', 'population': 26.3}, {'country': 'North Macedonia', 'energyAccess': 100.0, 'hdi': 0.815, 'extreme_poverty': 2.6633506, 'region': 'Europe', 'population': 1.8}, {'country': 'Northern Mariana Islands', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'Oceania', 'population': 0.0}, {'country': 'Norway', 'energyAccess': 100.0, 'hdi': 0.97, 'extreme_poverty': 0.15653396, 'region': 'Europe', 'population': 5.5}, {'country': 'Oman', 'energyAccess': 100.0, 'hdi': 0.858, 'extreme_poverty':NaN, 'region': 'Middle East', 'population': 4.7}, {'country': 'Pakistan', 'energyAccess': 95.0, 'hdi': 0.544, 'extreme_poverty': 4.932448, 'region': 'Asia', 'population': 243.7}, {'country': 'Palau', 'energyAccess': 100.0, 'hdi': 0.786, 'extreme_poverty':NaN, 'region': 'Oceania', 'population': 0.0}, {'country': 'Palestine', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.5027174, 'region': 'Middle East', 'population': 5.3}, {'country': 'Panama', 'energyAccess': 95.0, 'hdi': 0.839, 'extreme_poverty': 1.2881935, 'region': 'North America', 'population': 4.4}, {'country': 'Papua New Guinea', 'energyAccess': 19.0, 'hdi': 0.576, 'extreme_poverty': 39.68331, 'region': 'Oceania', 'population': 10.2}, {'country': 'Paraguay', 'energyAccess': 100.0, 'hdi': 0.756, 'extreme_poverty': 1.3295585, 'region': 'South America', 'population': 6.8}, {'country': 'Peru', 'energyAccess': 96.2, 'hdi': 0.794, 'extreme_poverty': 2.656552, 'region': 'South America', 'population': 33.5}, {'country': 'Philippines', 'energyAccess': 94.8, 'hdi': 0.72, 'extreme_poverty': 6.754131, 'region': 'Asia', 'population': 114.0}, {'country': 'Poland', 'energyAccess': 100.0, 'hdi': 0.906, 'extreme_poverty': 0.10752012, 'region': 'Europe', 'population': 38.4}, {'country': 'Portugal', 'energyAccess': 100.0, 'hdi': 0.89, 'extreme_poverty': 0.22650385, 'region': 'Europe', 'population': 10.4}, {'country': 'Puerto Rico', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty':NaN, 'region': 'North America', 'population': 3.2}, {'country': 'Qatar', 'energyAccess': 100.0, 'hdi': 0.886, 'extreme_poverty': 0.0, 'region': 'Middle East', 'population': 2.9}, {'country': 'Romania', 'energyAccess': 100.0, 'hdi': 0.845, 'extreme_poverty': 1.7570449, 'region': 'Europe', 'population': 19.2}, {'country': 'Russia', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.010298438, 'region': 'Europe', 'population': 145.6}, {'country': 'Rwanda', 'energyAccess': 50.6, 'hdi': 0.578, 'extreme_poverty': 52.005394, 'region': 'Africa', 'population': 13.7}, {'country': 'Saint Kitts and Nevis', 'energyAccess': 100.0, 'hdi': 0.84, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.0}, {'country': 'Saint Lucia', 'energyAccess': 100.0, 'hdi': 0.748, 'extreme_poverty': 5.222044, 'region': 'North America', 'population': 0.2}, {'country': 'Saint Vincent and the Grenadines', 'energyAccess': 100.0, 'hdi': 0.798, 'extreme_poverty':NaN, 'region': 'North America', 'population': 0.1}, {'country': 'Samoa', 'energyAccess': 98.3, 'hdi': 0.708, 'extreme_poverty': 1.1502274, 'region': 'Oceania', 'population': 0.2}, {'country': 'San Marino', 'energyAccess': 100.0, 'hdi': 0.915, 'extreme_poverty':NaN, 'region': 'Europe', 'population': 0.0}, {'country': 'Saudi Arabia', 'energyAccess': 100.0, 'hdi': 0.9, 'extreme_poverty':NaN, 'region': 'Middle East', 'population': 32.2}, {'country': 'Senegal', 'energyAccess': 67.9, 'hdi': 0.53, 'extreme_poverty': 9.926822, 'region': 'Africa', 'population': 17.7}, {'country': 'Serbia', 'energyAccess': 100.0, 'hdi': 0.833, 'extreme_poverty': 1.2428293, 'region': 'Europe', 'population': 6.8}, {'country': 'Seychelles', 'energyAccess': 100.0, 'hdi': 0.848, 'extreme_poverty': 0.51100403, 'region': 'Africa', 'population': 0.1}, {'country': 'Sierra Leone', 'energyAccess': 29.4, 'hdi': 0.467, 'extreme_poverty': 26.062035, 'region': 'Africa', 'population': 8.3}, {'country': 'Singapore', 'energyAccess': 100.0, 'hdi': 0.946, 'extreme_poverty':NaN, 'region': 'Asia', 'population': 5.6}, {'country': 'Slovakia', 'energyAccess': 100.0, 'hdi': 0.88, 'extreme_poverty': 0.10148099, 'region': 'Europe', 'population': 5.5},
  {'country': 'Slovenia', 'energyAccess': 100.0, 'hdi': 0.931, 'extreme_poverty': 0.0, 'region': 'Europe', 'population': 2.1}, {'country': 'Solomon Islands', 'energyAccess': 76.0, 'hdi': 0.584, 'extreme_poverty': 26.564884, 'region': 'Oceania', 'population': 0.8}, {'country': 'Somalia', 'energyAccess': 48.9, 'hdi': 0.404, 'extreme_poverty':NaN, 'region': 'Africa', 'population': 17.8}, {'country': 'South Africa', 'energyAccess': 86.5, 'hdi': 0.741, 'extreme_poverty': 20.492558, 'region': 'Africa', 'population': 62.4}, {'country': 'South Korea', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.0, 'region': 'Asia', 'population': 51.8}, {'country': 'South Sudan', 'energyAccess': 8.4, 'hdi': 0.388, 'extreme_poverty': 67.32727, 'region': 'Africa', 'population': 11.0}, {'country': 'Spain', 'energyAccess': 100.0, 'hdi': 0.918, 'extreme_poverty': 0.5642503, 'region': 'Europe', 'population': 47.8}, {'country': 'Sri Lanka', 'energyAccess': 100.0, 'hdi': 0.776, 'extreme_poverty': 0.95861256, 'region': 'Asia', 'population': 22.8}, {'country': 'Sudan', 'energyAccess': 63.2, 'hdi': 0.511, 'extreme_poverty': 15.26306, 'region': 'Africa', 'population': 49.4}, {'country': 'Suriname', 'energyAccess': 99.0, 'hdi': 0.722, 'extreme_poverty': 1.1043117, 'region': 'South America', 'population': 0.6}, {'country': 'Sweden', 'energyAccess': 100.0, 'hdi': 0.959, 'extreme_poverty': 0.6292847, 'region': 'Europe', 'population': 10.5}, {'country': 'Switzerland', 'energyAccess': 100.0, 'hdi': 0.97, 'extreme_poverty': 0.037200913, 'region': 'Europe', 'population': 8.8}, {'country': 'Syria', 'energyAccess': 89.0, 'hdi':NaN, 'extreme_poverty': 24.835932, 'region': 'Middle East', 'population': 22.5}, {'country': 'Tajikistan', 'energyAccess': 100.0, 'hdi': 0.691, 'extreme_poverty': 6.114529, 'region': 'Asia', 'population': 10.2}, {'country': 'Tanzania', 'energyAccess': 45.8, 'hdi':NaN, 'extreme_poverty': 44.94932, 'region': 'Africa', 'population': 64.7}, {'country': 'Thailand', 'energyAccess': 99.9, 'hdi': 0.798, 'extreme_poverty': 0.013972186, 'region': 'Asia', 'population': 71.7}, {'country': 'Togo', 'energyAccess': 57.2, 'hdi': 0.571, 'extreme_poverty': 26.59183, 'region': 'Africa', 'population': 9.1}, {'country': 'Tonga', 'energyAccess': 100.0, 'hdi': 0.769, 'extreme_poverty': 0.01921559, 'region': 'Oceania', 'population': 0.1}, {'country': 'Trinidad and Tobago', 'energyAccess': 100.0, 'hdi': 0.807, 'extreme_poverty': 1.343, 'region': 'North America', 'population': 1.5}, {'country': 'Tunisia', 'energyAccess': 100.0, 'hdi': 0.746, 'extreme_poverty': 0.27373365, 'region': 'Africa', 'population': 12.1}, {'country': 'Turkey', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.44286466, 'region': 'Middle East', 'population': 87.1}, {'country': 'Turkmenistan', 'energyAccess': 100.0, 'hdi': 0.764, 'extreme_poverty': 43.115105, 'region': 'Asia', 'population': 7.2}, {'country': 'Tuvalu', 'energyAccess': 100.0, 'hdi': 0.689, 'extreme_poverty': 3.625352, 'region': 'Oceania', 'population': 0.0}, {'country': 'Uganda', 'energyAccess': 47.1, 'hdi': 0.582, 'extreme_poverty': 42.11563, 'region': 'Africa', 'population': 47.3}, {'country': 'Ukraine', 'energyAccess': 100.0, 'hdi': 0.779, 'extreme_poverty': 0.028825609, 'region': 'Europe', 'population': 41.0}, {'country': 'United Arab Emirates', 'energyAccess': 100.0, 'hdi': 0.94, 'extreme_poverty': 0.0, 'region': 'Middle East', 'population': 10.2}, {'country': 'United Kingdom', 'energyAccess': 100.0, 'hdi': 0.946, 'extreme_poverty': 0.24510054, 'region': 'Europe', 'population': 68.2}, {'country': 'United States', 'energyAccess': 100.0, 'hdi': 0.938, 'extreme_poverty': 1.2491857, 'region': 'North America', 'population': 341.5}, {'country': 'Uruguay', 'energyAccess': 100.0, 'hdi': 0.862, 'extreme_poverty': 0.15517578, 'region': 'South America', 'population': 3.4}, {'country': 'Uzbekistan', 'energyAccess': 100.0, 'hdi': 0.74, 'extreme_poverty': 2.2530925, 'region': 'Asia', 'population': 34.9}, {'country': 'Vanuatu', 'energyAccess': 70.0, 'hdi': 0.621, 'extreme_poverty': 9.963333, 'region': 'Oceania', 'population': 0.3}, {'country': 'Venezuela', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 7.1300364, 'region': 'South America', 'population': 28.2}, {'country': 'Vietnam', 'energyAccess': 100.0, 'hdi':NaN, 'extreme_poverty': 0.9637949, 'region': 'Asia', 'population': 99.7}, {'country': 'Yemen', 'energyAccess': 76.0, 'hdi': 0.47, 'extreme_poverty': 19.802757, 'region': 'Middle East', 'population': 38.2}, {'country': 'Zambia', 'energyAccess': 47.8, 'hdi': 0.595, 'extreme_poverty': 64.349754, 'region': 'Africa', 'population': 20.2}, {'country': 'Zimbabwe', 'energyAccess': 50.1, 'hdi': 0.598, 'extreme_poverty': 39.75453, 'region': 'Africa', 'population': 16.1}
];

// Region colors for consistent styling
const regionColors = {
  'North America': '#0066CC', // Strong blue
  'Europe': '#4daf4a',        // Green
  'Asia': '#ff7f00',          // Orange
  'Africa': '#e41a1c',        // Red
  'South America': '#984ea3', // Purple
  'Oceania': '#00BCD4',       // Cyan
  'Middle East': '#FFC107'    // Amber
};

export default function EnergyGrowthScatter() {
    const [ref, isInView] = useInView({ threshold: 0.3 });
    const chartRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const [activeRegion, setActiveRegion] = useState('all');
    const [activeMetric, setActiveMetric] = useState('hdi');
    const [showPulse, setShowPulse] = useState(false);
    const [showStory, setShowStory] = useState(false);
    const [storyStage, setStoryStage] = useState(0);
  
    /* ---------- handlers ---------- */
    const handleRegionFilter = (region) => setActiveRegion(region);
    const handleMetricToggle  = (metric) => setActiveMetric(metric);
  
    const advanceStory = () => {
      if (storyStage < 3) {
        setStoryStage((s) => s + 1);
      } else {
        const next = document.getElementById('generation-mix');
        next?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };
  
    /* ---------- chart ---------- */
    useEffect(() => {
      if (!isInView || !chartRef.current) return;
  
      const timer = setTimeout(() => setShowStory(true), 1000);
  
      import('plotly.js-dist').then((Plotly) => {
        /* --- prep data --- */
        const filtered =
          activeRegion === 'all'
            ? mockData
            : mockData.filter((d) => d.region === activeRegion);
  
        const BIG_POP = 100; // ≥ 100 million ⇒ show label
  
        const uniqueRegions = [...new Set(mockData.map((d) => d.region))];
  
        const traces = [];
  
        /* region-specific marker traces */
        uniqueRegions.forEach((region) => {
          const rData = filtered.filter((d) => d.region === region);
          if (!rData.length) return;
  
          traces.push({
            x: rData.map((d) => d.energyAccess),
            y: rData.map((d) =>
              activeMetric === 'hdi' ? d.hdi : d.extreme_poverty
            ),
            mode: 'markers',
            type: 'scatter',
            name: region,
            text: rData.map((d) => d.country),
            marker: {
              // marker area ∝ population  → scale by √pop
              size: rData.map((d) => Math.sqrt(d.population) * 1.6 + 4),
              color: regionColors[region],
              opacity:
                activeRegion === 'all' || activeRegion === region ? 0.85 : 0.25,
              line: { color: '#fff', width: 0.5 }
            },
            hovertemplate:
              '<b>%{text}</b><br>' +
              'Energy Access: %{x:.1f}%<br>' +
              (activeMetric === 'hdi'
                ? 'HDI: %{y:.3f}<br>'
                : 'Extreme Poverty: %{y:.1f}%<br>') +
              'Population: %{customdata:,} M<extra></extra>',
            customdata: rData.map((d) => d.population)
          });
        });
  
        /* labels for very large countries */
  
        /* global trend-line (ordinary least squares) */
        const xVals = filtered.map((d) => d.energyAccess);
        const yVals = filtered.map((d) =>
          activeMetric === 'hdi' ? d.hdi : d.extreme_poverty
        );
  
        if (xVals.length > 1) {
          const n = xVals.length;
          const sumX = xVals.reduce((a, b) => a + b, 0);
          const sumY = yVals.reduce((a, b) => a + b, 0);
          const sumXY = xVals.reduce((acc, x, i) => acc + x * yVals[i], 0);
          const sumX2 = xVals.reduce((acc, x) => acc + x * x, 0);
          const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
          const intercept = sumY / n - slope * (sumX / n);
  
          const xMin = Math.min(...xVals);
          const xMax = Math.max(...xVals);
          traces.push({
            x: [xMin, xMax],
            y: [slope * xMin + intercept, slope * xMax + intercept],
            mode: 'lines',
            type: 'scatter',
            name: 'Trend',
            line: { width: 2, dash: 'dot', color: '#111' },
            hoverinfo: 'skip',
            showlegend: false
          });
        }
  
        /* --- layout --- */
        const layout = {
          title: {
            text: 'Energy Access Enables Human Development',
            font: { family: 'Inter, sans-serif', size: 26, color: '#0A1B2B' }
          },
          xaxis: {
            title: {
              text: 'Population with Electricity Access (%)',
              font: { family: 'Source Sans Pro, sans-serif', size: 16 }
            },
            range: [0, 105],
            ticksuffix: '%',
            gridcolor: '#e5e7eb',
            zeroline: false
          },
          yaxis: {
            title: {
              text:
                activeMetric === 'hdi'
                  ? 'Human Development Index (HDI)'
                  : 'Extreme Poverty (% of population below $2.15/day)',
              font: { family: 'Source Sans Pro, sans-serif', size: 16 }
            },
            range: activeMetric === 'hdi' ? [0.4, 1] : [0, 80],
            gridcolor: '#e5e7eb',
            zeroline: false
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          hovermode: 'closest',
          margin: { l: 80, r: 30, t: 60, b: 80 },
          legend: {
            x: 0,
            y: 1,
            font: { family: 'Source Sans Pro, sans-serif', size: 12 },
            bgcolor: 'rgba(255,255,255,0.85)',
            bordercolor: '#e5e7eb',
            borderwidth: 1
          },
          /* quadrant helper text */
          annotations: [
            {
              x: 15,
              y: activeMetric === 'hdi' ? 0.45 : 70,
              xref: 'x',
              yref: 'y',
              text:
                activeMetric === 'hdi'
                  ? 'Low access / Low development'
                  : 'Low access / High poverty',
              showarrow: false,
              font: { size: 11, color: '#6b7280' }
            },
            {
              x: 95,
              y: activeMetric === 'hdi' ? 0.95 : 5,
              xref: 'x',
              yref: 'y',
              text:
                activeMetric === 'hdi'
                  ? 'Universal access / High development'
                  : 'Universal access / Low poverty',
              showarrow: false,
              font: { size: 11, color: '#6b7280' }
            }
          ]
        };
  
        Plotly.newPlot(chartRef.current, traces, layout, {
          responsive: true,
          displayModeBar: false
        });
  
        setTimeout(() => setShowPulse(true), 1500);
      });
  
      return () => clearTimeout(timer);
    }, [isInView, activeRegion, activeMetric, reduceMotion]);
  
  return (
    <section 
      ref={ref} 
      className="py-20 bg-cloud-white transition-all duration-1000" 
      id="energy-growth"
    >
      <div className="container mx-auto px-4">
        {/* Enhanced section header with decorative elements */}
        <div className="max-w-4xl mx-auto mb-12 relative">
          <div className="absolute left-0 top-12 w-1/4 h-px bg-gradient-to-r from-transparent to-sky-cyan"></div>
          <div className="absolute right-0 top-12 w-1/4 h-px bg-gradient-to-l from-transparent to-sky-cyan"></div>
                    
          <h2 className="text-3xl md:text-4xl font-bold text-night-navy mb-4 text-center">
            Energy Access: <span className="text-sky-cyan">The Foundation of Human Progress</span>
          </h2>
          
          <p className="text-xl text-graphite text-center">
            Modern energy services transform quality of life at both individual and societal levels
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Region filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeRegion === 'all' 
                  ? 'bg-night-navy text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-night-navy'
              }`}
              onClick={() => handleRegionFilter('all')}
            >
              All Regions
            </button>
            
            {Object.keys(regionColors).map(region => (
              <button
                key={region}
                className={`px-4 py-2 rounded-md transition-colors flex items-center ${
                  activeRegion === region 
                    ? 'bg-night-navy text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-night-navy'
                }`}
                onClick={() => handleRegionFilter(region)}
              >
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: regionColors[region] }}
                ></span>
                {region}
              </button>
            ))}
          </div>
          
          {/* Metric toggle */}
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                activeMetric === 'hdi' 
                  ? 'bg-night-navy text-white shadow-md' 
                  : 'text-night-navy hover:bg-gray-200'
              }`}
              onClick={() => handleMetricToggle('hdi')}
            >
              Human Development
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                activeMetric === 'mortality' 
                  ? 'bg-night-navy text-white shadow-md' 
                  : 'text-night-navy hover:bg-gray-200'
              }`}
              onClick={() => handleMetricToggle('mortality')}
            >
              Extreme Poverty
            </button>
          </div>
        </div>
        
        {/* Main chart area with explanatory text */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div ref={chartRef} className="w-full h-[550px]" />
            <p className="mt-2 text-center text-sm text-graphite">
            Bubble size ∝ population (million). Data aggregated from World Bank and Our World in Data (2022). 
            Extreme poverty data availability fluctuates by country, the graph shows the most recent, available data.
            </p>
          </div>
          
          {/* Explanatory text that changes as user scrolls or clicks */}
          <div className={`bg-night-navy text-cloud-white p-6 rounded-lg transition-all duration-700 ${
            showStory ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">The Energy Story</h3>
              <div className="flex items-center space-x-1">
                {[0, 1, 2, 3].map(dot => (
                  <div 
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all ${
                      dot === storyStage ? 'bg-sky-cyan scale-125' : 'bg-cloud-white/40'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Story content changes based on stage */}
            <div className="min-h-[240px]">
                {storyStage === 0 && (
                    <div>
                    <p className="mb-4">
                        <strong className="text-sky-cyan text-lg">Electricity unlocks human progress</strong>
                    </p>
                    <p className="mb-4">
                        Electric light, refrigeration, and digital connectivity form the backbone of modern life. Each bubble on this chart shows how the share of people with electricity rises together with the Human Development Index&nbsp;(HDI).
                    </p>
                    <p>
                        Where power reaches homes, life expectancy, education, and incomes climb.
                    </p>
                    </div>
                )}           

                {storyStage === 1 && (
                    <div>
                    <p className="mb-4">
                        <strong className="text-sky-cyan text-lg">The first kilowatt brings important gains</strong>
                    </p>
                    <p className="mb-4">
                        Small amounts of electricity can supercharge growth and development. Basic lighting, phone charging, and clean cooking reduce disease and free up time for study and work.
                    </p>
                    <p>
                        Early-stage solutions such as solar home systems and micro-grids therefore punch far above their wattage in development impact.
                    </p>
                    </div>
                )}
            
                {storyStage === 2 && (
                    <div>
                    <p className="mb-4">
                        <strong className="text-sky-cyan text-lg">Not all journeys look the same</strong>
                    </p>
                    <p className="mb-4">
                        Geography, governance, and resource endowments shape unique energy paths. Each region has key infrastructure, geographical, and economic differences that change what the "optimal" pathway looks like.
                    </p>
                    <p>
                        Targeted strategies that respect local context beat one-size-fits-all blueprints.
                    </p>
                    </div>
                )}
              
                {storyStage === 3 && (
                    <div>
                    <p className="mb-4">
                        <strong className="text-sky-cyan text-lg">Beyond access: reliable, clean power</strong>
                    </p>
                    <p className="mb-4">
                        At near-universal access, HDI differences persist. The next leap depends on electricity that is affordable, reliable, and increasingly low-carbon.
                    </p>
                    <p>
                        That's why the conversation must shift from “How many have power?” to “What kind of power?”—which is exactly where we're heading next.
                    </p>
                    </div>
                )}            
                </div>
            <button 
              onClick={advanceStory}
              className="mt-4 bg-sky-cyan text-white px-4 py-2 rounded-md hover:bg-sky-cyan/90 transition-colors w-full"
            >
              {storyStage < 3 ? 'Continue' : 'Explore Energy Mix →'}
            </button>
          </div>
        </div>
        
        {/* Pulse indicator that appears when ready to move to next section */}
        {showPulse && (
            <div className="mt-16 text-center pb-6">
            <p className="text-graphite mb-4">Discover how energy sources shape national systems</p>
            <a href="#generation-mix" className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-cyan mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </a>
            </div>
        )}
                </div>
    </section>
  );
}
