package com.inesazt.visitors;

public class Role {
	private String id;
	private String name;
	private String label;
	private String locate;
	private Pos pos;
	private int count;
	private boolean warn;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Pos getPos() {
		return pos;
	}

	public void setPos(Pos pos) {
		this.pos = pos;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getLocate() {
		return locate;
	}

	public void setLocate(String locate) {
		this.locate = locate;
	}

	public boolean isWarn() {
		return warn;
	}

	public void setWarn(boolean warn) {
		this.warn = warn;
	}

}
