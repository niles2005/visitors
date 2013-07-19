package com.inesazt.visitors;

public class Pos {
	public Pos(int lat,int lon) {
		this.lat = lat;
		this.lon = lon;
	}
	
	private int lat;
	private int lon;
	public int getLat() {
		return lat;
	}
	public void setLat(int lat) {
		this.lat = lat;
	}
	public int getLon() {
		return lon;
	}
	public void setLon(int lon) {
		this.lon = lon;
	}
}
