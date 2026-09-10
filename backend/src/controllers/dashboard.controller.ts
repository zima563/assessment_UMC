import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service';

export class DashboardController {
  // Handle HTTP GET /api/dashboard/stats
  async getStats(_req: Request, res: Response) {
    try {
      const stats = await dashboardService.getDashboardMetrics();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch dashboard metrics',
      });
    }
  }
}

export const dashboardController = new DashboardController();
