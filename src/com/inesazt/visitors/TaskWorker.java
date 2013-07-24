package com.inesazt.visitors;

import java.util.TimerTask;

import javax.servlet.ServletContext;

public class TaskWorker extends TimerTask {
	private boolean isRunning = false;
	public static final long LoopTime = 5 * 1000;//5 second
	private ServletContext context = null;

	public TaskWorker() {
	}

	public TaskWorker(ServletContext context) {
		this.context = context;
	}

	public void run() {
		if (!isRunning) {
			isRunning = true;

			doLoopWork();
			
			isRunning = false;
		} else {
		}
	}
	
	private Global m_global = null;
	private static int m_loopIndex = 0;
	private void doLoopWork() {
		m_loopIndex++;
		System.err.println("do task loop:" + m_loopIndex);
		if(m_global == null) {
			m_global = Global.getInstance();
		} else {
			m_global.getEvents().doTaskWork();
		}
	}
	
}
